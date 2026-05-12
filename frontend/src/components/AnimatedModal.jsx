import { memo, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

/**
 * Lightweight, GPU-accelerated modal with open/close transitions.
 * - No 3rd-party deps (keeps Vite bundle small).
 * - Animates opacity + transform only (compositor-friendly).
 * - Respects prefers-reduced-motion (CSS-side fall-back).
 * - Locks body scroll + closes on Escape & backdrop click.
 */
function AnimatedModal({
  open,
  onClose,
  eyebrow,
  title,
  titleAccent,
  maxWidth = "max-w-5xl",
  children,
  testId = "animated-modal",
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeTimer = useRef(null);

  // Mount/unmount + enter/exit state machine.
  useEffect(() => {
    if (open) {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      setMounted(true);
      // Wait two frames so the browser paints the initial (hidden) state
      // before flipping to .is-open — guarantees the transition runs.
      const r1 = requestAnimationFrame(() => {
        const r2 = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(r2);
      });
      return () => cancelAnimationFrame(r1);
    }
    if (mounted) {
      setVisible(false);
      closeTimer.current = setTimeout(() => {
        setMounted(false);
        closeTimer.current = null;
      }, 320); // must match CSS transition duration
    }
    return undefined;
  }, [open, mounted]);

  // Escape-to-close + body scroll lock — only while mounted.
  useEffect(() => {
    if (!mounted) return undefined;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, onClose]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`anim-modal-root ${visible ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal"}
      data-testid={testId}
    >
      <div className="anim-modal-backdrop" onClick={onClose} />

      <div
        className={`anim-modal-panel glass-card rounded-[24px] ${maxWidth}`}
        style={{
          background:
            "linear-gradient(135deg, #1a1310 0%, #1d150f 50%, #15110d 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 80% 0%, rgba(240,164,106,0.14), transparent 60%)",
          }}
        />

        <div className="relative flex items-start justify-between gap-4 p-6 md:p-8 border-b border-[var(--glass-border)]">
          <div>
            {eyebrow && (
              <div className="eyebrow">
                <span className="dot" /> {eyebrow}
              </div>
            )}
            {title && (
              <h3 className="serif text-2xl md:text-3xl mt-3 leading-tight">
                {title}
                {titleAccent && (
                  <span className="serif-italic amber-text"> {titleAccent}</span>
                )}
              </h3>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="btn btn-ghost"
            style={{ padding: "0.55rem 0.7rem" }}
            data-testid={`${testId}-close`}
          >
            <X size={16} />
          </button>
        </div>

        <div className="relative overflow-y-auto p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}

export default memo(AnimatedModal);
