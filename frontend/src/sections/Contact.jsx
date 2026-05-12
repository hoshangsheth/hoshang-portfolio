import { memo, useCallback, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Mail, MapPinned, Clock3, FileText,
  Linkedin, Github, BriefcaseBusiness,
} from "lucide-react";
import { ContactPill, Divider, InfoCard } from "./primitives";

/**
 * Contact — form + info panel.
 *
 * Local state is scoped to the form alone (`status`). Submission is async
 * and goes to Formspree. We use a stable `useCallback` so the form element
 * doesn't re-bind handlers on every render.
 */
function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formspree.io/f/xojrkygl", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }, []);

  return (
    <section id="contact" className="relative py-24 md:py-32" data-testid="contact-section">
      <div className="section-bg-warm" />

      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal eyebrow mx-auto"><span className="dot" /> Let's Work Together</div>
          <h2 className="reveal d1 section-title mt-5">
            Ready to build something
            <br />
            <span className="serif-italic amber-text">intelligent?</span>
          </h2>
          <p className="reveal d2 section-sub mt-5 mx-auto">
            I'm actively seeking opportunities in Machine Learning, Gen AI, and AI engineering. Building intelligent
            systems that automate workflows, improve decisions, and create real-world impact.
          </p>

          <div
            className="reveal d3 mt-8 inline-flex flex-wrap justify-center items-center gap-1 sm:gap-3 glass-strong rounded-full px-3 sm:px-6 py-2 sm:py-3"
            data-testid="contact-quick-links"
          >
            <ContactPill href="mailto:hoshangsheth@gmail.com" icon={Mail} label="Email Me" />
            <Divider />
            <ContactPill href="https://www.linkedin.com/in/hoshangsheth/" icon={Linkedin} label="LinkedIn" />
            <Divider />
            <ContactPill href="https://github.com/hoshangsheth" icon={Github} label="GitHub" />
            <Divider />
            <ContactPill
              href="https://drive.google.com/file/d/17X9NQ1W8l44MRkAiJl-gQIUKI3zmkfUA/view?usp=sharing"
              icon={FileText}
              label="Resume"
            />
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-[1.3fr,1fr] gap-6">
          <form onSubmit={handleSubmit} className="reveal glass-strong p-6 md:p-8 rounded-[28px]" data-testid="contact-form">
            <div className="serif text-2xl mb-1">Send a Message</div>
            <div className="text-[0.88rem] text-[var(--text-muted)]">
              Fill out the form and I'll get back to you within 24 hours.
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="field-label" htmlFor="fname">Name</label>
                <input className="field-input" type="text" id="fname" name="name" placeholder="Your full name" required data-testid="form-name" />
              </div>
              <div>
                <label className="field-label" htmlFor="fcompany">Company <span>(optional)</span></label>
                <input className="field-input" type="text" id="fcompany" name="company" placeholder="Your company" data-testid="form-company" />
              </div>
              <div>
                <label className="field-label" htmlFor="femail">Email</label>
                <input className="field-input" type="email" id="femail" name="email" placeholder="you@company.com" required data-testid="form-email" />
              </div>
              <div>
                <label className="field-label" htmlFor="fphone">Phone <span>(optional)</span></label>
                <input className="field-input" type="tel" id="fphone" name="phone" placeholder="+91 98765 43210" data-testid="form-phone" />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="fmessage">Message</label>
                <textarea className="field-textarea" id="fmessage" name="message" placeholder="Tell me about your project, role, or idea..." required data-testid="form-message" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto justify-center" disabled={status === "sending"} data-testid="form-submit">
              {status === "sending" ? "Sending..." : "Send Message"} <ArrowRight size={16} />
            </button>

            {status === "success" && (
              <div
                className="mt-5 px-4 py-3 rounded-xl text-sm"
                style={{ background: "rgba(140, 200, 130, 0.10)", border: "1px solid rgba(140,200,130,0.30)", color: "#a8e6a3" }}
                data-testid="form-success"
              >
                ✓ Message sent! I'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div
                className="mt-5 px-4 py-3 rounded-xl text-sm"
                style={{ background: "rgba(232,115,74,0.10)", border: "1px solid rgba(232,115,74,0.30)", color: "#e8734a" }}
                data-testid="form-error"
              >
                ✗ Something went wrong. Please email me directly at hoshangsheth@gmail.com
              </div>
            )}
          </form>

          <div className="reveal d1 grid gap-4 content-start" data-testid="contact-info">
            <InfoCard
              icon={MapPinned}
              title="Location"
              body={<>Mumbai, India<br /><span className="text-[var(--text-muted)] text-xs">Open to remote worldwide</span></>}
            />
            <InfoCard
              icon={Mail}
              title="Email"
              body={<a href="mailto:hoshangsheth@gmail.com" className="amber-text hover:underline">hoshangsheth@gmail.com</a>}
            />
            <InfoCard icon={BriefcaseBusiness} title="Open To" body="Full-time roles · Freelance · Consulting · Collaborations" />
            <InfoCard icon={Clock3} title="Response Time" body="Usually within 24 hours" />
            <div className="flex flex-col gap-2 mt-1">
              <a href="https://www.linkedin.com/in/hoshangsheth/" target="_blank" rel="noreferrer" className="btn btn-primary justify-center">
                Connect on LinkedIn <ArrowRight size={15} />
              </a>
              <a href="https://drive.google.com/file/d/17X9NQ1W8l44MRkAiJl-gQIUKI3zmkfUA/view?usp=sharing" target="_blank" rel="noreferrer" className="btn btn-ghost justify-center">
                Download Resume <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Contact);
