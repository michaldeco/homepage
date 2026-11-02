import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// A text with an English and a Slovak version, for the YAML files.
const localized = z.object({ en: z.string(), sk: z.string() });

// src/content/{en,sk}/profile.md — name, contact links in frontmatter; bio in the body.
// Entry ids are `en/profile` and `sk/profile`.
const profile = defineCollection({
  loader: glob({ pattern: '*/profile.md', base: './src/content' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    location: z.string(),
    timezone: z.string(),
    availability: z.string(),
    email: z.email(),
    links: z.array(z.object({ label: z.string(), url: z.url() })),
    contactNote: z.string(),
  }),
});

// src/content/{en,sk}/projects/*.md — one file per project, sorted by `order`.
// Entry ids start with the language, e.g. `en/projects/vse-energy-data`.
// `company` is optional, e.g. for side projects or open source.
const projects = defineCollection({
  loader: glob({
    pattern: '*/projects/*.md',
    base: './src/content',
    // Ids from the file path, as usual. (By default a `slug` field would become the id, so the
    // English and Slovak files of one project would collide.)
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    // The project page's address: /work/<slug> (Slovak: /sk/work/<slug>). Same in both languages.
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'lowercase words joined by hyphens, e.g. scrap-optimization'),
    // Shown on the homepage; the Markdown body (optional) becomes the project's own page.
    summary: z.string(),
    company: z.string().optional(),
    role: z.string(),
    period: z.string(),
    order: z.number(),
    tags: z.array(z.string()).default([]),
  }),
});

// src/content/skills.yaml — skill groups, sorted by `order`.
const skills = defineCollection({
  loader: file('src/content/skills.yaml'),
  schema: z.object({
    label: localized,
    order: z.number(),
    items: z.array(z.union([z.string(), localized])),
  }),
});

// src/content/experience.yaml — employment history, sorted by `order`.
// `logo` is a file in public/logos/; leave it out to show a placeholder box.
const experience = defineCollection({
  loader: file('src/content/experience.yaml'),
  schema: z.object({
    company: z.union([z.string(), localized]),
    role: localized,
    period: z.string(),
    order: z.number(),
    logo: z.string().optional(),
  }),
});

export const collections = { profile, projects, skills, experience };
