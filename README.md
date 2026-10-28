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
| Share preview image (link previews on LinkedIn, Slack, …) | edit `design/og-image.svg`, then `rsvg-convert design/og-image.svg -o public/og-image.png` |

Layout and styles: `src/layouts/Base.astro`, `src/pages/index.astro`, `src/styles/global.css`.
Not-found page: `src/pages/404.astro`. Response headers on Cloudflare: `public/_headers`.

## Development

Requires Node.js 22.12 or newer (`.node-version` pins the major version for Cloudflare builds).

```sh
npm install      # once, and after pulling dependency changes
npm run dev      # live preview at http://localhost:4321
npm run check    # type-check .astro and TypeScript files
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

## Deployment

Hosted on Cloudflare, connected to this repo.
Build command: `npm run build`. Output directory: `dist`.
