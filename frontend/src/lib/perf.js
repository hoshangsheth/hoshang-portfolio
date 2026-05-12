/**
 * perf.js — hardware-aware performance tier detection.
 *
 * We compute a single tier ("low" | "mid" | "high") once on first call, then
 * memoize it. Every visual subsystem (Atmosphere, reveal animations, mouse
 * glow, glass blurs) consults this to scale itself.
 *
 * Inputs considered:
 *   - prefers-reduced-motion        → forces "low"
 *   - max device pixel ratio        → high-DPI mobile gets a small step down
 *   - navigator.deviceMemory        → < 4GB → low, < 8GB → mid, else high
 *   - navigator.hardwareConcurrency → < 4 cores → low, < 8 cores → mid
 *   - matchMedia('(hover: none)')   → coarse pointer (touch) → step down
 *   - matchMedia('(max-width: 768px)') → step down on small screens
 *   - data-saver / save-data        → forces "low"
 *
 * The "tier" is exposed both as a string and as a derived spec object that
 * downstream subsystems can read without re-deriving anything.
 */

const isBrowser = typeof window !== "undefined";

let cachedTier = null;
let cachedSpec = null;
let reducedMotion = false;

function detectTier() {
  if (!isBrowser) return "mid";

  // Honor accessibility preference unconditionally.
  reducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return "low";

  // Honor Data Saver if user opted in.
  const conn =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn && conn.saveData) return "low";

  let score = 0;

  const mem = navigator.deviceMemory || 8; // assume 8GB if unknown
  if (mem >= 8) score += 2;
  else if (mem >= 4) score += 1;

  const cores = navigator.hardwareConcurrency || 8;
  if (cores >= 8) score += 2;
  else if (cores >= 4) score += 1;

  // Touch / small viewport → step down.
  if (window.matchMedia && window.matchMedia("(hover: none)").matches) score -= 1;
  if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) score -= 1;

  // Very high DPR with low core count is brutal on GPU fill rate.
  const dpr = window.devicePixelRatio || 1;
  if (dpr > 2.5 && cores < 8) score -= 1;

  if (score >= 3) return "high";
  if (score >= 1) return "mid";
  return "low";
}

function specFor(tier) {
  // Each subsystem reads exactly what it needs from this spec. Keep it tiny.
  switch (tier) {
    case "high":
      return {
        tier,
        reducedMotion: false,
        // Atmosphere
        orbCount: 5,
        orbAlpha: 1,
        atmosphereFps: 60,         // target — actually runs uncapped (rAF)
        mouseGlow: true,
        mouseGlowSize: 380,
        // Reveal
        revealEnabled: true,
        // Heavy CSS effects
        allowBackdropBlur: true,
        allowHoverParallax: true,
      };
    case "mid":
      return {
        tier,
        reducedMotion: false,
        orbCount: 4,
        orbAlpha: 0.9,
        atmosphereFps: 60,
        mouseGlow: true,
        mouseGlowSize: 320,
        revealEnabled: true,
        allowBackdropBlur: true,
        allowHoverParallax: true,
      };
    case "low":
    default:
      return {
        tier: "low",
        reducedMotion,
        orbCount: 2,
        orbAlpha: 0.6,
        atmosphereFps: 30,
        mouseGlow: false,            // touch / low-end → disabled entirely
        mouseGlowSize: 280,
        revealEnabled: !reducedMotion,
        allowBackdropBlur: false,    // backdrop-filter is one of the most expensive paint ops
        allowHoverParallax: false,
      };
  }
}

export function getPerfTier() {
  if (cachedTier) return cachedTier;
  cachedTier = detectTier();
  return cachedTier;
}

export function getPerfSpec() {
  if (cachedSpec) return cachedSpec;
  cachedSpec = specFor(getPerfTier());
  return cachedSpec;
}

/**
 * Apply tier-derived CSS toggles to <html> so CSS can react too:
 *   html.perf-low      — disable backdrop blurs, simplify shadows
 *   html.perf-mid
 *   html.perf-high
 *   html.reduced-motion
 *
 * Call once near the entry point (App).
 */
export function applyPerfClasses() {
  if (!isBrowser) return;
  const spec = getPerfSpec();
  const html = document.documentElement;
  html.classList.remove("perf-low", "perf-mid", "perf-high");
  html.classList.add(`perf-${spec.tier}`);
  html.classList.toggle("reduced-motion", spec.reducedMotion);
  // Expose for any debugging / overlay later.
  html.dataset.perfTier = spec.tier;
}

/**
 * Subscribe to motion preference changes so users toggling system settings
 * mid-session aren't stuck with the old tier.
 */
export function subscribePerfChanges(onChange) {
  if (!isBrowser || !window.matchMedia) return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = () => {
    // Re-derive everything.
    cachedTier = null;
    cachedSpec = null;
    applyPerfClasses();
    onChange && onChange(getPerfSpec());
  };
  if (mq.addEventListener) mq.addEventListener("change", handler);
  else if (mq.addListener) mq.addListener(handler);
  return () => {
    if (mq.removeEventListener) mq.removeEventListener("change", handler);
    else if (mq.removeListener) mq.removeListener(handler);
  };
}
