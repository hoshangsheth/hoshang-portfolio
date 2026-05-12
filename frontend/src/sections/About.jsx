import { memo } from "react";
import { ABOUT_CARDS, ABOUT_STATS, TECH_PILLS } from "./data";

function About() {
  return (
    <section id="about" className="relative py-24 md:py-32" data-testid="about-section">
      <div className="section-bg-warm" />
      <div className="container-x grid lg:grid-cols-[1.15fr,1fr] gap-14 lg:gap-20">
        <div>
          <div className="reveal eyebrow"><span className="dot" /> About Me</div>
          <h2 className="reveal d1 section-title mt-5">
            Not just building models.
            <br />
            <span className="serif-italic amber-text">Engineering intelligent systems.</span>
          </h2>

          <div className="mt-8 space-y-5 text-[var(--text-soft)] leading-relaxed text-[1.02rem]">
            <p className="reveal d2">
              My journey into AI wasn’t traditional, it was built through reinvention, discipline, and an obsession with creating systems that solve real-world problems. Transitioning from a BPO background into Data Science and AI engineering, I taught myself to think beyond dashboards and static reports.
              <span className="text-[var(--gold)]"> I realized modern businesses don’t just need analytics, they need intelligent systems that can predict behavior, automate decisions, optimize operations, and scale impact.</span>
              {" "}Today, I build AI-driven applications across Machine Learning, Deep Learning, NLP, Gen AI, and automation, transforming raw data into products that deliver measurable business value.
            </p>
            <p className="reveal d3">
              Today I build <strong className="text-[var(--text)]">end-to-end ML and Gen AI systems</strong>, from
              data pipelines and predictive modeling to RAG applications, LLM-powered workflows, recommendation
              systems, and deployable AI products. My work combines machine learning, automation, explainability,
              APIs, and modern AI engineering to transform raw data into usable intelligence.
            </p>
            <p className="reveal d4">
              I'm focused on building <span className="text-[var(--gold)]">production-ready AI solutions</span>
              {" "}systems that reduce manual effort, improve decision-making, automate workflows, and create
              measurable business outcomes through Machine Learning and Generative AI.
            </p>
          </div>

          <div className="reveal d5 mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3" data-testid="about-stats">
            {ABOUT_STATS.map((s) => (
              <div key={s.label} className="glass-card p-4 rounded-2xl">
                <div className="serif text-2xl md:text-3xl text-[var(--gold)]">{s.num}</div>
                <div className="text-[0.7rem] uppercase tracking-[0.14em] text-[var(--text-muted)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="reveal mt-7 flex flex-wrap gap-2" data-testid="about-tech-pills">
            {TECH_PILLS.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 self-start lg:sticky lg:top-32" data-testid="about-cards">
          {ABOUT_CARDS.map((c, i) => (
            <div key={c.title} className={`reveal ${i ? `d${i}` : ""} glass-card p-5 rounded-2xl`}>
              <div
                className="w-10 h-10 rounded-xl grid place-items-center mb-3"
                style={{
                  background: "linear-gradient(135deg, rgba(240,164,106,0.22), rgba(184,100,64,0.10))",
                  border: "1px solid rgba(240,164,106,0.22)",
                  color: "var(--gold)",
                }}
              >
                <c.icon size={18} />
              </div>
              <div className="font-medium text-[var(--text)]">{c.title}</div>
              <div className="text-[0.85rem] mt-1.5 leading-relaxed text-[var(--text-soft)]">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(About);
