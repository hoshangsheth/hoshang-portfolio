# Vercel Deployment Guide

This portfolio is pre-configured for one-click Vercel deployment.

## Quick Deploy

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Vercel auto-detects `vercel.json` — no manual config needed.
4. Deploy.

## What Vercel does automatically (driven by `vercel.json`)

| Setting | Value | Why |
|---|---|---|
| `framework` | `null` | We're on Vite, not CRA. `null` tells Vercel to use our explicit commands. |
| `buildCommand` | `yarn build` | Runs `vite build` → outputs to `build/`. |
| `outputDirectory` | `build` | Matches Vite's `outDir` in `vite.config.js`. |
| `installCommand` | `yarn install --frozen-lockfile` | Reproducible installs from `yarn.lock`. |
| SPA rewrites | All routes → `/index.html` | Single-page anchor navigation works. |
| Cache headers | `/static/*` and `/img/*` → `max-age=31536000, immutable` | Hashed assets cached forever. |

## Requirements

- Node 20+ (set in `package.json` `engines` and `.nvmrc`).
- Yarn 1.x (declared in `packageManager`).

## Environment variables

This portfolio doesn't currently require any. If you add one in the future:

- Use a name starting with `REACT_APP_` (legacy, still works) or `VITE_`.
- Set it in Vercel **Project Settings → Environment Variables**.
- Access it in code as `import.meta.env.REACT_APP_FOO` or `import.meta.env.VITE_FOO`.

The `envPrefix: ['REACT_APP_', 'VITE_']` line in `vite.config.js` keeps both
naming styles working so you don't have to rename anything.

## Performance defaults baked in

- Initial JS chunks split into vendor-react / vendor-icons / index / per-section.
- Hashed filenames under `/static/*` → infinite cache.
- AVIF + WebP hero portrait preloaded (`<link rel="preload">`).
- Canvas-based atmosphere (no `filter: blur` orbs).
- Hardware-tier scaling auto-activates on low-end devices and respects `prefers-reduced-motion`.

## Local commands

```bash
# Install
yarn install

# Dev (HMR on http://localhost:3000)
yarn dev

# Production build (outputs to ./build)
yarn build

# Preview the production build locally
yarn preview
```

## Troubleshooting

- **404 on a deep link** → confirm `vercel.json` `rewrites` is present. It should be; if you copied a sub-folder, ensure `vercel.json` is at the project root that Vercel imports.
- **"Cannot find module" on Vercel** → check that the file extension is `.jsx` for any JSX, not `.js`. Vite's SWC plugin is strict.
- **Heavy first paint** → confirm `build/img/hoshang.avif` exists. If it's missing, re-run `python3 scripts/optimize_hero.py` before deploying.
