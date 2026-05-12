import { useEffect, useRef } from "react";
import { getPerfSpec } from "@/lib/perf";

/**
 * useReveal — scroll-in fade/translate primitive.
 *
 * Previously this scanned `document.querySelectorAll('.reveal')` on mount,
 * which is fine for a single-page composition but wastes a synchronous DOM
 * walk and observes every node at once.
 *
 * This version:
 *   - Scopes to a container ref (or document) so lazy-loaded sections can
 *     opt in only their own reveals when they mount.
 *   - Re-observes when new reveal elements appear (sections gated by
 *     IntersectionObserver-based lazy mount add new `.reveal` children after
 *     the initial pass).
 *   - Respects reduced-motion / low-tier devices by short-circuiting and
 *     adding `.in` immediately — no observer overhead at all.
 *   - Disconnects cleanly to avoid the observer outliving the component.
 *
 * Returns a ref to attach to the wrapper. Pass nothing to scope to <body>.
 */
export default function useReveal(scopeRef) {
  // We keep an internal observer reference so React state isn't involved.
  const observerRef = useRef(null);

  useEffect(() => {
    const spec = getPerfSpec();
    const scope =
      (scopeRef && scopeRef.current) || document.body;

    // Reduced motion / low tier → immediately reveal everything; never observe.
    if (!spec.revealEnabled || spec.reducedMotion) {
      const showAll = () => {
        scope.querySelectorAll(".reveal:not(.in)").forEach((el) => {
          el.classList.add("in");
        });
      };
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(scope, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    if (typeof IntersectionObserver === "undefined") {
      // Old browser fallback.
      scope.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      {
        // Slight pre-trigger so the animation has time to settle before the
        // element is fully in view at 120/144Hz.
        threshold: 0.04,
        rootMargin: "0px 0px -40px 0px",
      }
    );
    observerRef.current = io;

    const observeAll = () => {
      scope.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    };

    // Initial pass after layout — wait one frame so styles are applied.
    let r1 = requestAnimationFrame(() => requestAnimationFrame(observeAll));

    // Watch for sections being lazy-mounted. We only observe additions and
    // only descend into `.reveal` children, so this is cheap.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.addedNodes.length) {
          // Defer one frame so the new section's CSS classes are in place.
          requestAnimationFrame(observeAll);
          return;
        }
      }
    });
    mo.observe(scope, { childList: true, subtree: true });

    // Safety net — if a reveal never intersects (e.g. shorter than viewport
    // and already inside it at load), force show after a short delay.
    const safety = setTimeout(() => {
      scope.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
      });
    }, 2500);

    return () => {
      cancelAnimationFrame(r1);
      clearTimeout(safety);
      mo.disconnect();
      io.disconnect();
      observerRef.current = null;
    };
  }, [scopeRef]);
}
