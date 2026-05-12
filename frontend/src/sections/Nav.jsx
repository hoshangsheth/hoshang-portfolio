import { memo, useState, useCallback } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "./data";

/**
 * Nav — sticky pill nav.
 *
 * - Top-level header is memoized so it doesn't re-render when the rest of
 *   the page hydrates lazy-loaded sections.
 * - The mobile menu is the only stateful part; we use a callback ref-style
 *   handler so identity is stable across renders.
 * - Anchor links use the browser-native smooth scroll behavior (configured
 *   globally via `html { scroll-behavior: smooth }`); no JS scroll lib.
 */
function Nav() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <header
      data-testid="site-nav"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1180px,calc(100%-1.5rem))]"
    >
      <div className="glass-strong flex items-center justify-between px-4 sm:px-6 py-3 rounded-full">
        <a href="#hero" className="flex items-center gap-2 group" data-testid="nav-logo">
          <div
            className="w-8 h-8 rounded-full grid place-items-center"
            style={{ background: "linear-gradient(135deg, #f4b896, #d99565)", color: "#1a0f08" }}
          >
            <span className="font-bold text-sm">H</span>
          </div>
          <span className="text-sm tracking-wide font-medium hidden sm:block">Hoshang Sheth</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="nav-link" data-testid={`nav-${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex btn btn-primary"
          style={{ padding: "0.55rem 1.05rem", fontSize: "0.8rem" }}
          data-testid="nav-cta"
        >
          Get in touch <ArrowRight size={14} />
        </a>

        <button
          type="button"
          className="md:hidden glass rounded-full p-2"
          onClick={toggle}
          aria-label="Toggle menu"
          data-testid="nav-mobile-toggle"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 glass-strong rounded-2xl p-3 flex flex-col gap-1" data-testid="mobile-menu">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="px-3 py-2 rounded-xl text-sm text-[var(--text-soft)] hover:bg-white/5"
              onClick={close}
            >
              {n.label}
            </a>
          ))}
          <a href="#contact" onClick={close} className="btn btn-primary mt-2 justify-center">
            Get in touch <ArrowRight size={14} />
          </a>
        </div>
      )}
    </header>
  );
}

export default memo(Nav);
