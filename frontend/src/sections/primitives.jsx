import { memo } from "react";

/**
 * primitives.jsx — small visual atoms shared across sections.
 *
 * Every component here is `memo`-wrapped because they're rendered as part of
 * static data lists (project mockups, info cards, timeline cards, etc.) and
 * never receive new prop identities once their parent section is mounted.
 * That avoids needless reconciliation cost when reveal classes flip on.
 */

export const Row = memo(function Row({ label, value, rust }) {
  return (
    <div className="flex justify-between items-center text-[0.78rem] py-1.5 border-b border-white/[0.04] last:border-0">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className="font-medium" style={{ color: rust ? "#e8734a" : "var(--gold)" }}>{value}</span>
    </div>
  );
});

export const Bar = memo(function Bar({ w, amber, strong }) {
  return (
    <div
      className="rounded-full my-1"
      style={{
        height: 8, width: w,
        background: amber
          ? `rgba(240,164,106,${strong ? 0.18 : 0.10})`
          : "rgba(255,230,200,0.05)",
        border: amber
          ? `1px solid rgba(240,164,106,${strong ? 0.28 : 0.18})`
          : "1px solid rgba(255,230,200,0.06)",
      }}
    />
  );
});

export const Divider = memo(function Divider() {
  return <div className="w-px h-5 bg-white/10 hidden sm:block" />;
});

export const ContactPill = memo(function ContactPill({ href, icon: Icon, label }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm text-[var(--text-soft)] hover:text-[var(--gold)] transition-colors"
    >
      <Icon size={15} /> <span className="hidden sm:inline">{label}</span>
    </a>
  );
});

export const InfoCard = memo(function InfoCard({ icon: Icon, title, body }) {
  return (
    <div className="glass-card p-5 rounded-2xl flex gap-4 items-start">
      <div
        className="shrink-0 w-10 h-10 rounded-xl grid place-items-center"
        style={{
          background: "linear-gradient(135deg, rgba(240,164,106,0.22), rgba(184,100,64,0.08))",
          border: "1px solid rgba(240,164,106,0.22)",
          color: "var(--gold)",
        }}
      >
        <Icon size={18} />
      </div>
      <div className="text-[0.92rem] leading-relaxed">
        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">{title}</div>
        <div>{body}</div>
      </div>
    </div>
  );
});

export const FloatCardStatic = memo(function FloatCardStatic({
  icon: Icon, label, value, sub, accent, className = "", anim = "7s",
}) {
  return (
    <div
      className={`glass-card p-4 rounded-2xl float-y ${className}`}
      style={{ animationDuration: anim }}
    >
      <div
        className="w-9 h-9 rounded-xl grid place-items-center mb-3"
        style={{
          background: "linear-gradient(135deg, rgba(240,164,106,0.22), rgba(184,100,64,0.10))",
          border: "1px solid rgba(240,164,106,0.25)",
          color: "var(--gold)",
        }}
      >
        <Icon size={18} />
      </div>
      <div className="text-[0.62rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">{label}</div>
      <div className={`mt-0.5 text-[0.92rem] font-medium ${accent ? "text-[var(--gold)]" : ""}`}>{value}</div>
      <div className="text-[0.68rem] text-[var(--text-muted)] mt-0.5 leading-snug">{sub}</div>
    </div>
  );
});

/** Render the project-card mockup body from data-driven mockup spec. */
export const ProjectMockup = memo(function ProjectMockup({ mockup }) {
  if (!mockup) return null;
  if (mockup.type === "rec") {
    return (
      <>
        {mockup.rows.map((r, i) => <Row key={i} label={r.label} value={r.value} rust={r.rust} />)}
        <div className="h-2" />
        {mockup.bars.map((b, i) => <Bar key={i} w={b.w} amber={b.amber} strong={b.strong} />)}
      </>
    );
  }
  if (mockup.type === "loan") {
    return (
      <>
        {mockup.rows.map((r, i) => <Row key={i} label={r.label} value={r.value} rust={r.rust} />)}
        {mockup.footer && (
          <div className="text-[0.65rem] text-[var(--text-muted)] text-center mt-1">{mockup.footer}</div>
        )}
      </>
    );
  }
  if (mockup.type === "segments") {
    return (
      <>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {mockup.chips.map((c, i) => (
            <span
              key={i}
              className={`chip text-[0.6rem]${c.amber ? " chip-amber" : ""}`}
              style={c.custom || undefined}
            >
              {c.label}
            </span>
          ))}
        </div>
        {mockup.rows.map((r, i) => <Row key={i} label={r.label} value={r.value} />)}
      </>
    );
  }
  return null;
});
