import { memo, useEffect, useState, useCallback } from "react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { PROJECTS_LARGE, PROJECTS_SMALL, PROJECTS_EXTRA } from "./data";
import { ProjectMockup } from "./primitives";

const ProjectLarge = memo(function ProjectLarge({ project, reverse, index }) {
  const p = project;
  // Pre-computed per-card background so we don't re-evaluate on every paint.
  const bg =
    index === 0 ? "linear-gradient(135deg, #1a1310 0%, #21160f 50%, #19120e 100%)"
    : index === 1 ? "linear-gradient(135deg, #1f1410 0%, #2a1a12 50%, #1d130f 100%)"
    : "linear-gradient(135deg, #15110d 0%, #1d1610 50%, #14110d 100%)";

  return (
    <article
      className={`reveal glass-card rounded-[28px] p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center ${reverse ? "md:[direction:rtl]" : ""}`}
      data-testid={`project-card-${index}`}
    >
      <div className="md:[direction:ltr]">
        <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden" style={{ background: bg }}>
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(120% 80% at 80% 10%, rgba(240,164,106,0.20), transparent 60%)" }}
          />
          <div className="relative h-full grid place-items-center p-5">
            <div className="mockup w-full max-w-[320px]">
              <div className="mockup-bar">
                <div className="mockup-dot" style={{ background: "#ff6b6b" }} />
                <div className="mockup-dot" style={{ background: "#ffd93d" }} />
                <div className="mockup-dot" style={{ background: "#6bcb77" }} />
                <span className="text-[0.6rem] text-[var(--text-muted)] ml-2 truncate">{p.domain}</span>
              </div>
              <div>
                <ProjectMockup mockup={p.mockup} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:[direction:ltr]">
        <div className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--gold)]">{p.number}</div>
        <h3 className="serif text-3xl md:text-4xl mt-3 leading-tight">
          {p.title}
          <br />
          <span className="serif-italic amber-text">{p.titleAccent}</span>
        </h3>
        <p className="mt-5 text-[var(--text-soft)] leading-relaxed text-[0.95rem]">
          <span className="text-[#e8734a] font-medium uppercase text-[0.7rem] tracking-[0.16em] mr-2">Problem</span>
          {p.problem}
        </p>
        <p className="mt-3 text-[var(--text-soft)] leading-relaxed text-[0.95rem]">
          <span className="text-[var(--gold)] font-medium uppercase text-[0.7rem] tracking-[0.16em] mr-2">Impact</span>
          {p.impact}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary" data-testid={`project-${index}-live`}>
            Live App <ArrowUpRight size={15} />
          </a>
          <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-ghost" data-testid={`project-${index}-github`}>
            GitHub <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </article>
  );
});

// Reusable small project card — identical structure to those rendered in the
// "More Projects" grid so the modal stays visually consistent.
function SmallProjectCard({ p }) {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col">
      <div className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--gold)]">{p.tag}</div>
      <div className="mt-2 font-medium text-lg">{p.title}</div>
      <div className="mt-3 text-[0.88rem] text-[var(--text-soft)] leading-relaxed flex-1">{p.desc}</div>
      <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
        </div>
        <div className="flex gap-2 flex-wrap">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ padding: "0.45rem 1rem", fontSize: "0.78rem" }}
            >
              Live App <ArrowUpRight size={13} />
            </a>
          )}
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            style={{ padding: "0.45rem 1rem", fontSize: "0.78rem" }}
          >
            GitHub <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}

function MoreProjectsModal({ open, onClose, projects }) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    // Lock body scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const hasProjects = Array.isArray(projects) && projects.length > 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="More projects"
      data-testid="more-projects-modal"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(8, 5, 3, 0.72)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className="relative glass-card rounded-[24px] w-full max-w-5xl max-h-[88vh] flex flex-col overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1310 0%, #1d150f 50%, #15110d 100%)",
        }}
      >
        {/* Soft amber glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(120% 80% at 80% 0%, rgba(240,164,106,0.14), transparent 60%)" }}
        />

        {/* Header */}
        <div className="relative flex items-start justify-between gap-4 p-6 md:p-8 border-b border-[var(--glass-border)]">
          <div>
            <div className="eyebrow"><span className="dot" /> All Projects</div>
            <h3 className="serif text-2xl md:text-3xl mt-3 leading-tight">
              Explore More
              <span className="serif-italic amber-text"> Work</span>
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close more projects"
            className="btn btn-ghost"
            style={{ padding: "0.55rem 0.7rem" }}
            data-testid="more-projects-close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="relative overflow-y-auto p-6 md:p-8">
          {hasProjects ? (
            <div className="grid md:grid-cols-2 gap-5" data-testid="more-projects-grid">
              {projects.map((p) => (
                <SmallProjectCard key={p.title} p={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="serif-italic amber-text text-xl">More projects coming soon</div>
              <p className="mt-3 text-[var(--text-soft)] text-[0.92rem] max-w-md mx-auto leading-relaxed">
                New work is currently being added. Check back shortly to see additional
                Machine Learning and Gen AI projects.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <section id="projects" className="relative py-24 md:py-32" data-testid="projects-section">
      <div className="section-bg-warm" />
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="reveal eyebrow"><span className="dot" /> Featured Work</div>
            <h2 className="reveal d1 section-title mt-5">
              AI Systems Engineered
              <br />
              <span className="serif-italic amber-text">for Real-World Impact</span>
            </h2>
          </div>
          <p className="reveal d2 max-w-[36ch] text-[var(--text-soft)] md:text-right">
            Production-ready Machine Learning and Gen AI systems designed to automate workflows, improve decisions,
            and create measurable business value.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {PROJECTS_LARGE.map((p, i) => (
            <ProjectLarge key={p.live} project={p} reverse={i % 2 === 1} index={i} />
          ))}
        </div>

        <div className="mt-20">
          <div className="reveal eyebrow"><span className="dot" /> More Projects</div>
          <div className="mt-6 grid md:grid-cols-2 gap-5" data-testid="projects-small">
            {PROJECTS_SMALL.map((p, i) => (
              <div key={p.title} className={`reveal ${i ? "d1" : ""} glass-card p-6 rounded-2xl flex flex-col`}>
                <div className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--gold)]">{p.tag}</div>
                <div className="mt-2 font-medium text-lg">{p.title}</div>
                <div className="mt-3 text-[0.88rem] text-[var(--text-soft)] leading-relaxed flex-1">{p.desc}</div>
                <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        style={{ padding: "0.45rem 1rem", fontSize: "0.78rem" }}
                      >
                        Live App <ArrowUpRight size={13} />
                      </a>
                    )}
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline"
                      style={{ padding: "0.45rem 1rem", fontSize: "0.78rem" }}
                    >
                      GitHub <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Projects button */}
          <div className="reveal mt-10 flex justify-center">
            <button
              type="button"
              onClick={openModal}
              className="btn btn-ghost"
              data-testid="view-more-projects-btn"
            >
              View More Projects <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <MoreProjectsModal open={modalOpen} onClose={closeModal} projects={PROJECTS_EXTRA} />
    </section>
  );
}

export default memo(Projects);
