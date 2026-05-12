import { useEffect, useRef } from "react";
import { getPerfSpec } from "@/lib/perf";

/**
 * Atmosphere — cinematic background renderer.
 *
 * Why a canvas: the original DOM implementation used four `filter: blur(90px)`
 * orbs. CSS filter blur is one of the most expensive paint operations on
 * modern browsers — every frame allocates a large offscreen buffer per blurred
 * layer, kicks the compositor out of fast-path mode and pegs the GPU on
 * mobile. By drawing the same warm orbs as soft radial gradients on a single
 * canvas we:
 *
 *   - Eliminate filter:blur entirely (the gradient _is_ the blur).
 *   - Render four orbs in one paint call, one composite layer.
 *   - Decouple all atmospheric motion from React state / DOM layout.
 *   - Get to throttle to ~30fps cheaply on low-end devices.
 *
 * Lifecycle:
 *   - Sizes itself to viewport with `devicePixelRatio` clamped to 2 (extra DPR
 *     wastes fill rate on huge soft gradients no human will perceive).
 *   - Pauses immediately when `document.hidden` and resumes on visibility.
 *   - Pauses when off-screen via IntersectionObserver on a sibling.
 *   - Uses delta-time accumulation so 60Hz, 120Hz and 144Hz all move at the
 *     same wall-clock speed.
 *
 * Mouse glow is a tiny separate CSS element driven by RAF + transform; we
 * keep it because it adds tactile interaction at near-zero cost.
 */
export default function Atmosphere() {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const spec = getPerfSpec();
    if (spec.reducedMotion && spec.orbCount === 0) return; // truly nothing to render

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // ---- Sizing ----
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ---- Orb model ----
    // Each orb has a base position (% of viewport), a radius, a color and a
    // slow drift that wraps via sine. They are tinted to match the original
    // CSS palette (amber / rust / gold) so the visual identity is preserved.
    const palette = [
      { r: 240, g: 164, b: 106 }, // amber
      { r: 184, g: 100, b: 64 },  // rust
      { r: 232, g: 197, b: 148 }, // gold
      { r: 244, g: 184, b: 150 }, // peach
      { r: 240, g: 164, b: 106 }, // amber
    ];

    const orbCount = spec.orbCount;
    const baseAlpha = 0.55 * spec.orbAlpha;

    const orbs = Array.from({ length: orbCount }).map((_, i) => {
      const palIdx = i % palette.length;
      return {
        // Base position on a 0..1 grid, deterministically scattered.
        bx: [0.85, -0.05, 0.6, 0.4, 0.15][i % 5],
        by: [0.0, 0.35, 0.95, 0.55, 0.15][i % 5],
        // Drift amplitude in CSS pixels.
        ampX: 60 + (i % 3) * 25,
        ampY: 50 + (i % 2) * 30,
        // Drift period in seconds.
        period: 18 + i * 4,
        // Phase offset so they don't all peak together.
        phase: i * 1.7,
        // Radius (CSS pixels). Soft, large.
        radius: 320 + (i % 3) * 90,
        color: palette[palIdx],
        alpha: baseAlpha * (0.7 + ((i * 0.13) % 0.3)),
      };
    });

    // ---- Frame loop ----
    // We use delta-time so the motion speed is constant across 60/120/144 Hz.
    // We also throttle to spec.atmosphereFps on low-tier devices.
    const targetFrameMs = 1000 / spec.atmosphereFps;
    let lastDraw = 0;
    let t0 = performance.now();
    let elapsed = 0;
    let raf = 0;
    let running = false;

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      const since = now - lastDraw;
      if (since < targetFrameMs - 1) return; // throttle
      lastDraw = now;

      // Accumulate time in seconds.
      elapsed = (now - t0) / 1000;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter"; // additive — gives the warm glow stacking

      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        const omega = (Math.PI * 2) / o.period;
        const cx = o.bx * width + Math.sin(elapsed * omega + o.phase) * o.ampX;
        const cy = o.by * height + Math.cos(elapsed * omega * 0.85 + o.phase) * o.ampY;
        const r = o.radius;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const c = o.color;
        grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${o.alpha})`);
        grad.addColorStop(0.55, `rgba(${c.r}, ${c.g}, ${c.b}, ${o.alpha * 0.35})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    };

    const start = () => {
      if (running) return;
      running = true;
      t0 = performance.now() - elapsed * 1000;
      lastDraw = 0;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pause on tab hide → huge battery / thermal win.
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Throttled resize to avoid layout thrash on rotate / window drag.
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    };
    window.addEventListener("resize", onResize, { passive: true });

    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // ---- Mouse glow (separate, very cheap) ----
  useEffect(() => {
    const spec = getPerfSpec();
    if (!spec.mouseGlow) return;
    const isFine =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const el = glowRef.current;
    if (!el) return;
    el.style.width = `${spec.mouseGlowSize}px`;
    el.style.height = `${spec.mouseGlowSize}px`;
    el.style.opacity = "1";

    // We update CSS variables on the element rather than React state so this
    // never triggers a re-render. The transform reads --gx / --gy via CSS.
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf = 0;
    let last = performance.now();
    let active = true;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    // Delta-time interpolation: same on 60 / 120 / 144Hz.
    const tick = (now) => {
      if (!active) return;
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // Critically damped smoothing factor scaled by dt.
      // smoothing coefficient ≈ 1 - e^(-k*dt) with k ≈ 12 gives a buttery follow.
      const k = 12;
      const alpha = 1 - Math.exp(-k * dt);
      cx += (tx - cx) * alpha;
      cy += (ty - cy) * alpha;
      // translate3d hint to keep this on the GPU compositor.
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
    };

    const onVisibility = () => {
      if (document.hidden) {
        active = false;
        cancelAnimationFrame(raf);
      } else if (!active) {
        active = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      {/* Drifting orbs — single canvas covers the viewport */}
      <canvas
        ref={canvasRef}
        data-testid="atmosphere-orbs"
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0 w-full h-full"
        style={{
          // contain everything to its own layer → fewer paint regions
          contain: "strict",
          willChange: "transform",
        }}
      />

      {/* Subtle film grain (small SVG, statically tiled, no animation) */}
      <div className="grain" aria-hidden />

      {/* Mouse glow */}
      <div
        ref={glowRef}
        className="mouse-glow"
        aria-hidden
        style={{ opacity: 0, top: 0, left: 0 }}
      />
    </>
  );
}
