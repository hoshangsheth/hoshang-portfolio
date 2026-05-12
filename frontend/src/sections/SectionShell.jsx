import { memo, Suspense } from "react";
import useLazyMount from "@/hooks/useLazyMount";

/**
 * SectionShell — wraps a lazy-loadable section behind an IntersectionObserver.
 *
 * Why not just `React.lazy` + `Suspense`?
 *   - `React.lazy` only defers _network fetch_ of the chunk; React still
 *     immediately renders the suspense boundary when it hits the component.
 *   - We want to defer _both_ the chunk fetch AND the React reconciliation
 *     until the section is near the viewport. That keeps initial commit cost
 *     proportional to the hero only.
 *
 * Also applies `content-visibility: auto` so the browser can skip rendering
 * the section entirely until it's near viewport, with a stable
 * `contain-intrinsic-size` to avoid scrollbar jumps.
 */
const SectionShell = memo(function SectionShell({
  id,
  children,
  rootMargin = "800px 0px",
  intrinsicHeight = 720,
  className = "",
  fallback = null,
}) {
  const [ref, mounted] = useLazyMount({ rootMargin });

  return (
    <div
      ref={ref}
      data-section={id}
      className={className}
      style={{
        // Skip painting and layout of off-screen sections until they're near
        // the viewport. Saves enormous amounts of paint work on long pages.
        contentVisibility: mounted ? "visible" : "auto",
        containIntrinsicSize: `1px ${intrinsicHeight}px`,
      }}
    >
      {mounted ? <Suspense fallback={fallback}>{children}</Suspense> : null}
    </div>
  );
});

export default SectionShell;
