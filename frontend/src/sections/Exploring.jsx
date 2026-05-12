import { memo } from "react";
import { EXPLORING } from "./data";

function Exploring() {
  return (
    <section id="exploring" className="relative py-24 md:py-32" data-testid="exploring-section">
      <div className="section-bg-warm" />
      <div className="container-x text-center">
        <div className="reveal eyebrow mx-auto"><span className="dot" /> Currently Exploring</div>
        <h2 className="reveal d1 section-title mt-5 mx-auto" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)" }}>
          The Next Systems I'm <span className="serif-italic amber-text">Building Toward</span>
        </h2>
        <p className="reveal d2 section-sub mt-5 mx-auto">
          Focused on expanding into advanced AI engineering, intelligent automation, scalable deployment, and
          next-generation ML systems.
        </p>

        <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-4 gap-4" data-testid="exploring-grid">
          {EXPLORING.map((e, i) => (
            <div key={e.name} className={`reveal ${i % 4 ? `d${i % 4}` : ""} glass-card p-5 rounded-2xl`}>
              <div
                className="w-11 h-11 mx-auto rounded-2xl grid place-items-center mb-3"
                style={{
                  background: "linear-gradient(135deg, rgba(240,164,106,0.22), rgba(184,100,64,0.08))",
                  border: "1px solid rgba(240,164,106,0.22)",
                  color: "var(--gold)",
                }}
              >
                <e.icon size={18} />
              </div>
              <div className="font-medium">{e.name}</div>
              <div className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-muted)] mt-1">{e.status}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Exploring);
