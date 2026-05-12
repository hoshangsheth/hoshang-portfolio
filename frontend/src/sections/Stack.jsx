import { memo } from "react";
import { STACK } from "./data";

function Stack() {
  return (
    <section id="stack" className="relative py-24 md:py-32" data-testid="stack-section">
      <div className="section-bg-warm" />
      <div className="container-x">
        <div className="reveal eyebrow"><span className="dot" /> Technologies Behind the Systems</div>
        <h2 className="reveal d1 section-title mt-5">
          AI Engineering <span className="serif-italic amber-text">Stack</span>
        </h2>
        <p className="reveal d2 section-sub mt-5">
          A modern toolkit spanning Machine Learning, Gen AI, automation, deployment, and intelligent system engineering.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="stack-grid">
          {STACK.map((s, i) => (
            <div key={s.name} className={`reveal ${i % 4 ? `d${i % 4}` : ""} glass-card p-5 rounded-2xl`}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-xl grid place-items-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(240,164,106,0.22), rgba(184,100,64,0.08))",
                    border: "1px solid rgba(240,164,106,0.22)",
                    color: "var(--gold)",
                  }}
                >
                  <s.icon size={16} />
                </div>
                <div className="font-medium">{s.name}</div>
              </div>
              <div className="space-y-1.5">
                {s.items.map((it) => (
                  <div
                    key={it}
                    className="text-[0.82rem] text-[var(--text-soft)] py-1.5 px-3 rounded-lg"
                    style={{ background: "rgba(255, 230, 200, 0.025)", border: "1px solid rgba(255,220,190,0.06)" }}
                  >
                    {it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Stack);
