# Deploying the Portfolio (Vercel / Render / Netlify)

This portfolio is a **static React SPA** — no backend is required at runtime.
The contact form posts directly to Formspree.

## Vercel (recommended)

### Option A — UI (no config edits)
1. Push the repo to GitHub (use **Save to GitHub** in the Emergent chat input)
2. Go to https://vercel.com/new and import the GitHub repo
3. **Root Directory** → `frontend`
4. Framework preset → `Create React App` (auto-detected)
5. Build command → `yarn build` &nbsp;·&nbsp; Output directory → `build`
6. Click **Deploy**. Done.

`frontend/vercel.json` is already provided so SPA deep-links work and `/static/*` assets are cached for a year.

### Option B — Vercel CLI
```bash
cd frontend
npx vercel --prod
```

## Render

`render.yaml` at the repo root is preconfigured. Steps:
1. Push the repo to GitHub
2. Go to https://dashboard.render.com → **New +** → **Blueprint**
3. Connect the GitHub repo — Render will read `render.yaml` automatically
4. Approve and deploy

## Netlify

Same setup as Vercel — point Netlify at the `frontend` directory. The `public/_redirects` file already handles SPA fallback (`/* /index.html 200`).

```bash
# CLI
cd frontend
npx netlify deploy --prod --dir=build
```

## Environment variables

None are required — the `frontend/.env` keys (`REACT_APP_BACKEND_URL`, `WDS_SOCKET_PORT`, `ENABLE_HEALTH_CHECK`) are only used by the Emergent preview environment and are **safe to ignore** on Vercel/Render. You can leave them unset.

## Optional cleanup before deploying

`public/index.html` ships with two Emergent-platform extras you may want to remove for a clean third-party deployment:

1. **Emergent badge** — the `<a id="emergent-badge">` block (a "Made with Emergent" pill in the bottom-right). Delete the `<a>` element and its inline `<svg>` if you don't want it on your live site.
2. **PostHog tracking** — the `<script>` block at the bottom that calls `posthog.init(...)`. Remove this block if you don't want product analytics shared with the Emergent project.
3. **Emergent main script** — `<script src="https://assets.emergent.sh/scripts/emergent-main.js">`. Safe to remove for non-Emergent deployments.

The site renders identically without any of those.

## Build locally

```bash
cd frontend
yarn install
yarn build         # → frontend/build (deployable artifact)
```

## Custom domain

After deploying, add your domain in the Vercel/Render/Netlify dashboard. No code changes needed — the app uses relative URLs and a static `target="_blank"` for external links.
