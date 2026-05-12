import { memo } from "react";
import { CAPABILITIES } from "./data";

function Capabilities() {
  return (
    <section id="build" className="relative py-24 md:py-32" data-testid="capabilities-section">
      <div className="section-bg-warm" />
      <div className="container-x">
        <div className="reveal eyebrow"><span className="dot" /> Capabilities</div>
        <h2 className="reveal d1 section-title mt-5 max-w-[20ch]">
          Building the next layer
          <br />
          <span className="serif-italic amber-text">of intelligent systems.</span>
        </h2>
        <p className="reveal d2 section-sub mt-5">
          From Machine Learning pipelines to Gen AI architectures, engineering intelligent applications designed
          for automation, reasoning, and real-world impact.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="capabilities-grid">
          {CAPABILITIES.map((c, i) => (
            <div key={c.title} className={`reveal ${i % 5 ? `d${i % 5}` : ""} glass-card p-6 rounded-2xl`}>
              <div
                className="w-11 h-11 rounded-2xl grid place-items-center mb-4"
                style={{
                  background: "linear-gradient(135deg, rgba(240,164,106,0.22), rgba(184,100,64,0.08))",
                  border: "1px solid rgba(240,164,106,0.22)",
                  color: "var(--gold)",
                  boxShadow: "0 0 24px -6px rgba(240,164,106,0.30) inset",
                }}
              >
                <c.icon size={20} />
              </div>
              <div className="font-medium text-[1.02rem]">{c.title}</div>
              <div className="text-[0.85rem] text-[var(--text-soft)] mt-2 leading-relaxed">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Capabilities);
