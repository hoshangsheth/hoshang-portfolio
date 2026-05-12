import { memo, useCallback, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { TIMELINE, CERTS, CERTS_EXTRA } from "./data";
import AnimatedModal from "../components/AnimatedModal";

const TimelineCard = memo(function TimelineCard({ t, align }) {
  return (
    <div
      className={`glass-card p-5 rounded-2xl max-w-md ${
        align === "right" ? "md:text-right md:ml-auto" : "md:mr-auto"
      }`}
    >
      <div className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--gold)]">{t.date}</div>
      <div className="mt-1.5 font-medium text-[1.02rem]">{t.title}</div>
      <div className="text-[0.82rem] text-[var(--text-muted)] mt-0.5">{t.org}</div>
      <div className="mt-3 text-[0.88rem] leading-relaxed text-[var(--text-soft)]">{t.desc}</div>
    </div>
  );
});

const TimelineItem = memo(function TimelineItem({ t, i }) {
  const isLeft = t.side ? t.side === "left" : i % 2 === 0;

  return (
    <div
      className={`reveal ${i ? `d${i % 4}` : ""} relative md:grid md:grid-cols-[1fr_40px_1fr] md:gap-8 items-start`}
      data-testid={`timeline-${i}`}
    >
      <div className="hidden md:block">
        {isLeft && <TimelineCard t={t} align="right" />}
      </div>

      <div className="hidden md:flex items-center justify-center">
        <div className="relative">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: t.muted ? "rgba(240,164,106,0.30)" : "var(--amber)",
              boxShadow: t.muted ? "none" : "0 0 18px rgba(240,164,106,0.55)",
            }}
          />
          {!t.muted && (
            <div className="absolute inset-[-6px] rounded-full border border-[rgba(240,164,106,0.35)] animate-pulse" />
          )}
        </div>
      </div>

      <div className="hidden md:block">
        {!isLeft && <TimelineCard t={t} align="left" />}
      </div>

      <div className="md:hidden pl-10 relative">
        <div
          className="absolute left-3 top-2 w-3 h-3 rounded-full"
          style={{
            background: t.muted ? "rgba(240,164,106,0.30)" : "var(--amber)",
            boxShadow: t.muted ? "none" : "0 0 18px rgba(240,164,106,0.55)",
            transform: "translateX(-50%)",
          }}
        />
        <TimelineCard t={t} align="left" />
      </div>
    </div>
  );
});

// Reusable certification card — identical to those in the main Certifications grid.
function CertCard({ c }) {
  return (
    <a
      href={c.link}
      target="_blank"
      rel="noreferrer"
      className="glass-card p-5 rounded-2xl block group"
    >
      <div
        className="w-11 h-11 rounded-xl grid place-items-center mb-3"
        style={{
          background: "linear-gradient(135deg, rgba(240,164,106,0.22), rgba(184,100,64,0.08))",
          border: "1px solid rgba(240,164,106,0.22)",
          color: "var(--gold)",
        }}
      >
        <c.icon size={18} />
      </div>
      <div className="font-medium">{c.title}</div>
      <div className="text-[0.78rem] text-[var(--text-muted)] mt-1">{c.issuer}</div>
      <div className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] text-[var(--gold)] group-hover:gap-2 transition-all">
        View Certificate <ArrowUpRight size={13} />
      </div>
    </a>
  );
}

function Journey() {
  const [certsModalOpen, setCertsModalOpen] = useState(false);
  const openCertsModal = useCallback(() => setCertsModalOpen(true), []);
  const closeCertsModal = useCallback(() => setCertsModalOpen(false), []);

  const hasExtraCerts = Array.isArray(CERTS_EXTRA) && CERTS_EXTRA.length > 0;

  return (
    <section id="journey" className="relative py-24 md:py-32" data-testid="journey-section">
      <div className="section-bg-warm" />
      <div className="container-x">
        <div className="reveal eyebrow"><span className="dot" /> Experience &amp; Education</div>
        <h2 className="reveal d1 section-title mt-5">
          The <span className="serif-italic amber-text">Evolution</span>
        </h2>
        <p className="reveal d2 section-sub mt-5">
          From self-learning and internships to deployed ML systems and emerging Gen AI applications, a disciplined
          journey into modern AI engineering.
        </p>

        <div className="relative mt-14">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px timeline-line-grad hidden md:block" />
          <div className="absolute left-3 top-0 bottom-0 w-px timeline-line-grad md:hidden" />

          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <TimelineItem key={i} t={t} i={i} />
            ))}
          </div>
        </div>

        <div className="mt-24" data-testid="certifications">
          <div className="reveal eyebrow"><span className="dot" /> Certifications</div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTS.map((c, i) => (
              <a
                key={c.title}
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className={`reveal ${i ? `d${i % 4}` : ""} glass-card p-5 rounded-2xl block group`}
                data-testid={`cert-${i}`}
              >
                <div
                  className="w-11 h-11 rounded-xl grid place-items-center mb-3"
                  style={{
                    background: "linear-gradient(135deg, rgba(240,164,106,0.22), rgba(184,100,64,0.08))",
                    border: "1px solid rgba(240,164,106,0.22)",
                    color: "var(--gold)",
                  }}
                >
                  <c.icon size={18} />
                </div>
                <div className="font-medium">{c.title}</div>
                <div className="text-[0.78rem] text-[var(--text-muted)] mt-1">{c.issuer}</div>
                <div className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] text-[var(--gold)] group-hover:gap-2 transition-all">
                  View Certificate <ArrowUpRight size={13} />
                </div>
              </a>
            ))}
          </div>

          <div className="reveal mt-10 flex justify-center">
            <button
              type="button"
              onClick={openCertsModal}
              className="btn btn-ghost"
              data-testid="view-more-certs-btn"
            >
              View More Certifications <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <AnimatedModal
        open={certsModalOpen}
        onClose={closeCertsModal}
        eyebrow="All Certifications"
        title="Explore More"
        titleAccent="Credentials"
        testId="more-certs-modal"
      >
        {hasExtraCerts ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="more-certs-grid">
            {CERTS_EXTRA.map((c) => (
              <CertCard key={c.title} c={c} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="serif-italic amber-text text-xl">More certifications coming soon</div>
            <p className="mt-3 text-[var(--text-soft)] text-[0.92rem] max-w-md mx-auto leading-relaxed">
              New credentials are currently being added. Check back shortly to see additional
              certifications and achievements.
            </p>
          </div>
        )}
      </AnimatedModal>
    </section>
  );
}

export default memo(Journey);
