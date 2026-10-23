import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// src/content/profile.md — name, contact links in frontmatter; bio in the body.
const profile = defineCollection({
  loader: glob({ pattern: 'profile.md', base: './src/content' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    location: z.string(),
    timezone: z.string(),
    availability: z.string(),
    email: z.string(),
    links: z.array(z.object({ label: z.string(), url: z.string() })),
    contactNote: z.string(),
  }),
});

// src/content/projects/*.md — one file per project, sorted by `order`.
// `company` is optional, e.g. for side projects or open source.
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // Always visible; the Markdown body (optional) is shown behind a "know more" toggle.
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
    label: z.string(),
    order: z.number(),
    items: z.array(z.string()),
  }),
});

// src/content/experience.yaml — employment history, sorted by `order`.
// `logo` is a file in public/logos/; leave it out to show a placeholder box.
const experience = defineCollection({
  loader: file('src/content/experience.yaml'),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    order: z.number(),
    logo: z.string().optional(),
  }),
});

export const collections = { profile, projects, skills, experience };
