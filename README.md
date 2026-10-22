# michaldeco.com

Personal homepage / freelancer profile, built with [Astro](https://astro.build).
Content lives in plain Markdown/YAML files; the build turns it into static HTML.

## Editing content

| What | Where |
|---|---|
| Name, title, contact links, bio | `src/content/profile.md` |
| Projects (one file each, sorted by `order`; `company` optional for side projects) | `src/content/projects/*.md` |
| Skills (shown as pills) | `src/content/skills.yaml` |
| Employment history (with optional logos) | `src/content/experience.yaml` + logo files in `public/logos/` |
| Profile photo (optional) | `public/photo.jpg`, then uncomment the `<img>` in `src/pages/index.astro` |

Layout and styles: `src/layouts/Base.astro`, `src/pages/index.astro`, `src/styles/global.css`.

## Development

Requires Node.js 22.12 or newer.

```sh
npm install      # once, and after pulling dependency changes
npm run dev      # live preview at http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

## Deployment

Hosted on Cloudflare, connected to this repo.
Build command: `npm run build`. Output directory: `dist`.
