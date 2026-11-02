# michaldeco.com

Personal homepage / freelancer profile, built with [Astro](https://astro.build).
Content lives in plain Markdown/YAML files; the build turns it into static HTML.

## Editing content

| What | Where |
|---|---|
| Name, title, contact links, bio | `src/content/en/profile.md` (Slovak: `src/content/sk/profile.md`) |
| Projects (one file each, sorted by `order`; `company` optional for side projects). The summary is shown on the homepage, the story (Markdown body) on the project's own page at `/work/<slug>`; `slug` is the same in both languages | `src/content/en/projects/*.md` (Slovak: same file names in `src/content/sk/projects/`) |
| Skills (shown as pills; group labels in both languages) | `src/content/skills.yaml` |
| Employment history (with optional logos) | `src/content/experience.yaml` + logo files in `public/logos/` |
| Profile photo (optional) | `public/photo.jpg`, then uncomment the `<img>` in `src/components/Home.astro` |
| Share preview image (link previews on LinkedIn, Slack, …) | edit `design/og-image.svg`, then `rsvg-convert design/og-image.svg -o public/og-image.png`; Slovak: `og-image-sk.svg` → `og-image-sk.png` |
| Fixed texts (navigation, headings, "know more" link, 404 page) | `src/i18n/ui.ts` |

Layout and styles: `src/layouts/Base.astro`, `src/components/Home.astro`, `src/styles/global.css`.
Project pages: `src/components/ProjectPage.astro` (routes in `src/pages/work/` and `src/pages/sk/work/`).
Not-found page: `src/components/NotFound.astro`. Response headers on Cloudflare: `public/_headers`.

## Slovak version

English is the default at `/`, Slovak lives at `/sk/`. Every content file in `src/content/en/` has a
counterpart with the same name in `src/content/sk/`, and the YAML files hold both languages side by side.

- **Translations are not literal:** natural Slovak, but the same information as the English text.
- **Terms:** Slovak where an established term exists (strojové učenie, dátový sklad, služba); otherwise
  the English term in *italics* (*pipeline*, *entity resolution*). Tool names stay plain.
- **Typography:** single-letter words (v, k, s, z, a, o, u, i) are joined to the next word automatically
  (`src/i18n/typography.mjs`), so just type normal spaces.
- **Keeping in sync:** `npm run check` fails if a translation is missing, or if `slug`, `order`, `period`, `tags`,
  `name`, `email` or `timezone` differ between the languages (the profile's `links` are not compared,
  so change them in both files). It warns when an English file was committed after its Slovak version
  and prints a `git diff` command that shows what changed since the last translation.

## Development

Requires Node.js 22.12 or newer (`.node-version` pins the major version for Cloudflare builds).

`@astrojs/markdown-satteri` is pinned to the version Astro itself uses (for the Slovak spacing plugin).
When upgrading Astro, set it to the version in `node_modules/astro/package.json`, so only one copy is installed.

```sh
npm install      # once, and after pulling dependency changes
npm run dev      # live preview at http://localhost:4321
npm run check    # type-check, then check the Slovak translations
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

## Deployment

Hosted on Cloudflare, connected to this repo.
Build command: `npm run build`. Output directory: `dist`.
