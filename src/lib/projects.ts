export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** Where the project lives on this site (or externally). */
  href: string;
};

/**
 * Registry of projects that notes can reference by slug.
 *
 * The Projects page is still a placeholder, so this is intentionally empty.
 * Add entries here when real projects exist — notes that list a matching slug
 * in `relatedProjects` will then show a link automatically.
 */
export const projects: readonly Project[] = [];

/**
 * Resolve project slugs to projects. Unknown slugs are dropped silently, so a
 * note never links to a project that does not exist.
 */
export function getProjectsBySlugs(slugs: readonly string[] = []): Project[] {
  return slugs.flatMap((slug) => {
    const project = projects.find((candidate) => candidate.slug === slug);
    return project ? [project] : [];
  });
}
