import { memo } from "react";

function Footer() {
  return (
    <footer className="relative py-12 mt-12" data-testid="site-footer">
      <div className="container-x">
        <div className="glass-strong rounded-3xl px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full grid place-items-center"
              style={{ background: "linear-gradient(135deg, #f4b896, #d99565)", color: "#1a0f08" }}
            >
              <span className="font-bold text-sm">H</span>
            </div>
            <div>
              <div className="font-medium text-sm">Hoshang Sheth</div>
              <div className="text-[0.75rem] text-[var(--text-muted)]">Gen AI Engineer · Mumbai, India</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[0.82rem] text-[var(--text-muted)]">
            <a href="mailto:hoshangsheth@gmail.com" className="hover:text-[var(--gold)] transition-colors">Email</a>
            <span className="opacity-40">·</span>
            <a href="https://github.com/hoshangsheth" target="_blank" rel="noreferrer" className="hover:text-[var(--gold)] transition-colors">GitHub</a>
            <span className="opacity-40">·</span>
            <a href="https://www.linkedin.com/in/hoshangsheth/" target="_blank" rel="noreferrer" className="hover:text-[var(--gold)] transition-colors">LinkedIn</a>
          </div>

          <div className="text-[0.75rem] text-[var(--text-muted)]">© {new Date().getFullYear()} · Crafted with intention.</div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
