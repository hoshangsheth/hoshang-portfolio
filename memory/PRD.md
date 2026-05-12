# Hoshang Sheth — Portfolio (Liquid Glass / VisionOS Redesign)

## Original Problem Statement
Transform existing AI/ML portfolio HTML into a Neo Glassmorphism / VisionOS / Liquid Glass interface — cinematic spatial composition, warm graphite + amber glow palette, floating glass cards, atmospheric backgrounds, premium typography. Preserve ALL original content, sections, projects, certifications, navigation, forms, and links. Only the UI/visual system is being changed.

## User Choices
- Delivery: Convert to React app (`/app/frontend`)
- Background: Hybrid — cinematic desert/dusk photo behind hero + atmospheric gradients elsewhere
- Typography: Satoshi (body) + Instrument Serif (display)
- Glass scope: Glass for cards/projects/stats; cleaner typography for narrative sections

## Architecture
- React 19 SPA, single route at `/`, Tailwind + custom CSS Liquid Glass design system
- `App.js` → `<Atmosphere />` (orbs/grain/mouse-glow) + `<Portfolio />` (all sections)
- `useReveal()` hook — IntersectionObserver scroll reveal with 2.5s safety-net
- Backend not modified

## Key Files
- `/app/frontend/public/index.html` — Preloads Satoshi (Fontshare) + Instrument Serif (Google Fonts)
- `/app/frontend/src/index.css` — Design tokens (warm graphite + amber), `.glass`, `.glass-card`, `.glass-strong`, `.reveal`, `.btn`, `.eyebrow`, `.chip`, hero photo wash, ambient orbs, grain, scrollbar/selection
- `/app/frontend/src/App.js` — Composition root
- `/app/frontend/src/components/Atmosphere.jsx` — Drifting orbs + grain overlay + mouse-tracking glow (fine pointers)
- `/app/frontend/src/components/Portfolio.jsx` — Nav, Hero, About, Capabilities, Projects (3 large + 2 small), Journey (timeline + 6 certs), Stack (8 categories), Exploring (8 items), Contact (form + info), Footer
- `/app/frontend/src/hooks/useReveal.js` — Scroll-reveal hook

## Implemented Features
- Cinematic desert-dusk hero with floating glass profile card + 2x2 grid of micro stat panels (Specialty, AI Engineering, Degree, Status)
- Sticky pill nav with smooth-scroll anchors + mobile hamburger menu
- All 8 capability cards, 3 deep-dive project showcases (Movies/Games Recs, Smart Loan Recovery, Customer Segmentation) with mockup previews + 2 small projects (HR Analytics, Pizza Sales)
- Alternating timeline (5 entries) + 6 certification cards
- 8-category stack grid + 8 exploring tiles
- Contact form (Formspree submit via fetch) with success/error states + info panel + quick-link bar
- Footer with social links

## Tested (testing_agent_v3 iteration_1)
- 100% pass — all 50+ data-testids present
- Reveal animations fire (11/11 sample elements)
- Mobile menu toggle works at 390px
- Project / cert links correct + open in new tab
- No console errors

## P0/P1/P2 Backlog
- P2: Split `Portfolio.jsx` (~1140 lines) into per-section files for maintainability
- P2: Add subtle parallax on hero photo
- P2: Add prefers-reduced-motion variants for orb drift
- P2: Add view counter / analytics for project clicks (small business signal)

## Next Tasks
- Awaiting user feedback on visual direction
- Optional: Light/dark theme toggle, custom cursor variant on glass cards, lazy-load hero photo
