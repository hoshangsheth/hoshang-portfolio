import { useEffect, useRef, useState } from "react";

/**
 * useLazyMount — IntersectionObserver-driven gate for rendering heavy sections.
 *
 * Returns:
 *   [ref, shouldMount]
 *
 * - `ref` should be attached to the wrapping section's outer element.
 * - `shouldMount` flips to `true` the first time the section gets within
 *   `rootMargin` of the viewport, and never flips back. This is the key
 *   primitive for unblocking the main thread on initial paint: above-the-fold
 *   sections render immediately, below-the-fold sections wait until the user
 *   is about to see them.
 *
 * Options:
 *   - rootMargin: how far before the viewport to start hydrating (default
 *     "600px 0px" so sections are ready ~one screen ahead of scroll).
 *   - threshold: intersection threshold (default 0).
 *   - eager: if true, mount on next animation frame regardless of IO. Useful
 *     during dev or for sections like Nav.
 */
export default function useLazyMount({
  rootMargin = "600px 0px",
  threshold = 0,
  eager = false,
} = {}) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(eager);

  useEffect(() => {
    if (mounted) return;
    const el = ref.current;
    if (!el) return;

    // Safari fallback: if IntersectionObserver is missing, mount immediately.
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setMounted(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin, threshold]);

  return [ref, mounted];
}
