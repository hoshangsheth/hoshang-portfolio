import { memo } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS_LARGE, PROJECTS_SMALL } from "./data";
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

function Projects() {
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
        </div>
      </div>
    </section>
  );
}

export default memo(Projects);
