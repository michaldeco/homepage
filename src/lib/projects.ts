import { getCollection, type CollectionEntry } from 'astro:content';
import { t, type Lang } from '../i18n/ui';

export type Project = CollectionEntry<'projects'>;

// Projects of one language, sorted by `order`. Fails the build on a duplicate slug.
export async function getProjects(lang: Lang): Promise<Project[]> {
  const projects = (await getCollection('projects', ({ id }) => id.startsWith(`${lang}/`))).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const slugs = new Set<string>();
  for (const { id, data } of projects) {
    if (slugs.has(data.slug)) throw new Error(`Duplicate project slug "${data.slug}" (src/content/${id}.md)`);
    slugs.add(data.slug);
  }
  return projects;
}

// Only a project with a story (a Markdown body) gets its own page.
export const hasStory = (project: Project) => Boolean(project.body?.trim());

// getStaticPaths() for the project pages of one language.
export async function projectPagePaths(lang: Lang) {
  return (await getProjects(lang))
    .filter(hasStory)
    .map((project) => ({ params: { slug: project.data.slug }, props: { project } }));
}

// "Data Scientist at U. S. Steel Košice", or just the role without a company.
export const roleLine = (lang: Lang, { role, company }: Project['data']) =>
  company ? `${role} ${t(lang)['project.at']} ${company}` : role;
