import { memo } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HERO_SKILLS, HERO_CARDS } from "./data";
import { FloatCardStatic } from "./primitives";

/**
 * Hero — above-the-fold cinematic section.
 *
 * Performance notes:
 *  - Background photo is loaded as a low-quality preloaded portrait sprite +
 *    a CSS image set so AVIF/WebP is preferred; fallback PNG is used only on
 *    ancient browsers. We do NOT re-mount the photo on lazy hydration.
 *  - The floating capsule + 2x2 stat grid uses `transform: translate3d`
 *    animations only (no width/height/top/left animation), so the entire
 *    composition lives on the GPU compositor.
 *  - The static `<img>` portrait uses `fetchpriority="high"` and is
 *    preloaded in index.html so it is part of LCP, not a late paint.
 *  - The cinematic right-rail glass card is hidden under xl breakpoint
 *    (the long capsule); under lg the entire right column is hidden —
 *    cutting render cost dramatically on small viewports.
 */
function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 min-h-[100vh] flex items-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Cinematic desert dusk photo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-photo" />
        <div className="hero-photo-wash" />
      </div>

      <div className="container-x grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
        {/* LEFT */}
        <div>
          <div className="eyebrow" data-testid="hero-badge">
            <span className="dot" /> Available for opportunities
          </div>

          <h1
            className="mt-6 serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.02em]"
            data-testid="hero-name"
          >
            Hoshang
            <br />
            <span
              className="serif-italic"
              style={{
                background: "linear-gradient(135deg, #f4b896 0%, #f0a46a 45%, #e8c594 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sheth
            </span>
          </h1>

          <p className="mt-4 text-lg md:text-xl text-[var(--text-soft)] tracking-wide" data-testid="hero-role">
            Gen AI Engineer
          </p>
          <p className="mt-5 max-w-[55ch] text-[var(--text-soft)] leading-relaxed text-[1.02rem]">
            Building intelligent AI systems from predictive engines to Gen AI applications that drive automation and business growth.
          </p>

          <div className="mt-8 flex flex-wrap gap-3" data-testid="hero-actions">
            <a href="#projects" className="btn btn-primary" data-testid="hero-view-projects">
              View Projects <ArrowRight size={16} />
            </a>
            <a
              href="https://drive.google.com/file/d/17X9NQ1W8l44MRkAiJl-gQIUKI3zmkfUA/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              data-testid="hero-resume"
            >
              Resume <ArrowUpRight size={15} />
            </a>
            <a href="#contact" className="btn btn-outline" data-testid="hero-contact">
              Contact
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md" data-testid="hero-stats">
            {[
              { v: "5+", l: "Live Projects" },
              { v: "8+", l: "Certifications" },
              { v: "2",  l: "Internships" },
            ].map((s) => (
              <div key={s.l} className="border-l border-[rgba(240,164,106,0.25)] pl-4">
                <div className="serif text-3xl md:text-4xl text-[var(--gold)]">{s.v}</div>
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-muted)] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Unified Floating Capsule */}
        <div className="relative hidden lg:block" data-testid="hero-visual">
          <div
            className="absolute top-[-50px] left-[-240px] z-40 hidden xl:flex items-center overflow-hidden rounded-[40px] h-[175px] float-card"
            style={{
              width: "755px",
              background:
                "linear-gradient(to right, #0b0707 0%, #1a120f 40%, #3a2416 75%, #7a4b22 100%)",
              boxShadow:
                "0 12px 40px rgba(0,0,0,0.45), 0 0 40px rgba(240,164,106,0.10), inset 0 0 0 1px rgba(255,190,120,0.08)",
            }}
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-5 px-7 py-4 flex-[1.1]">
              {/* Glow */}
              <div
                className="absolute left-10 w-[160px] h-[160px] rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,190,120,0.22) 0%, transparent 70%)",
                }}
              />

              {/* Photo Ring */}
              <div
                className="relative w-[120px] h-[120px] rounded-full p-[5px] shrink-0"
                style={{
                  background: "linear-gradient(135deg, #f6c177, #ff9e64, #ffd89b)",
                  boxShadow: "0 0 40px rgba(255,170,90,0.35)",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-black">
                  <picture>
                    <source
                      srcSet="/img/hoshang.avif 480w, /img/hoshang@small.avif 240w"
                      sizes="120px"
                      type="image/avif"
                    />
                    <source
                      srcSet="/img/hoshang.webp 480w, /img/hoshang@small.webp 240w"
                      sizes="120px"
                      type="image/webp"
                    />
                    <img
                      src="/img/hoshang.png"
                      alt="Hoshang Sheth portrait"
                      width="120"
                      height="120"
                      decoding="async"
                      fetchPriority="high"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </div>
              </div>

              {/* Text */}
              <div className="relative z-10 max-w-[290px]">
                <h2 className="text-[1.32rem] font-medium tracking-[-0.02em] text-white leading-[1.2]">
                  Building intelligent systems for real-world impact.
                </h2>
                <p className="text-[0.9rem] text-white/55 mt-3">Full-time · Freelance · Contract</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div
              className="px-7 py-4 flex-1"
              style={{
                background: "linear-gradient(to right, rgba(122,75,34,0.10), rgba(122,75,34,0.18))",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex flex-wrap gap-3 max-w-[360px]">
                {HERO_SKILLS.map((s) => (
                  <span
                    key={s}
                    className="text-[0.74rem] text-orange-100/85 rounded-full px-[16px] py-[8px] whitespace-nowrap hero-skill-pill"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2x2 grid of floating glass cards with staggered offsets */}
          <div className="mt-[170px] grid grid-cols-2 gap-4 max-w-[480px] mx-auto">
            <FloatCardStatic className="-translate-x-2" anim="6s" {...HERO_CARDS[0]} />
            <FloatCardStatic className="translate-x-2 translate-y-3" anim="7.5s" {...HERO_CARDS[1]} />
            <FloatCardStatic className="-translate-x-1 translate-y-4" anim="7s" {...HERO_CARDS[2]} />
            <FloatCardStatic className="translate-x-3 translate-y-1" anim="8.5s" {...HERO_CARDS[3]} />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--text-muted)] flex flex-col items-center gap-2">
        <span>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--amber)] to-transparent" />
      </div>
    </section>
  );
}

export default memo(Hero);
