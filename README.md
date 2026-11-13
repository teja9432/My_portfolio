# Portfolio

Vite + React site, prerendered to static HTML at build time and deployed on Vercel.

## Editing content

All content lives in [`portfolio-data/portfolio.json`](portfolio-data/portfolio.json). Leave a field
empty (`""`, `[]` or `null`) when you don't know it; the site shows a visible `TODO:` marker for it.

- A project gets a case-study page at `/projects/<slug>/` once any `caseStudy` field is filled in.
- `isAI: true` on a project or certification badges and highlights it.
- `person.openToWork`: `true` / `false` / `null` (hidden).
- After changing `person.name`, `person.headline` or `site.url`, run `npm run og` to regenerate the share image.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Client build + SSR build + prerender (HTML per route, sitemap.xml, robots.txt) |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |
| `npm run check:urls` | Checks every project URL returns 200 |
| `npm run og` | Regenerates `public/og.png` and `public/apple-touch-icon.png` |
