import { projects as projectContent } from "@/content/projects";
import {
  projectStatuses,
  type Project,
  type ProjectLinks,
} from "@/types/project";

export type { Project } from "@/types/project";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function invalid(slug: string, problem: string): never {
  throw new Error(`Invalid project "${slug}": ${problem}`);
}

function requireText(slug: string, value: string, key: string): string {
  if (value.trim() === "") {
    return invalid(slug, `"${key}" must be a non-empty string.`);
  }
  return value.trim();
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function readLinks(slug: string, links: ProjectLinks | undefined): ProjectLinks | undefined {
  if (!links) return undefined;

  const github = links.github?.trim();
  const demo = links.demo?.trim();
  if (github && !isHttpUrl(github)) {
    return invalid(slug, `"links.github" must be an http(s) URL.`);
  }
  if (demo && !isHttpUrl(demo)) {
    return invalid(slug, `"links.demo" must be an http(s) URL.`);
  }
  if (!github && !demo) return undefined;

  return {
    ...(github ? { github } : {}),
    ...(demo ? { demo } : {}),
  };
}

function readProject(project: Project, seen: Set<string>): Project {
  const slug = project.slug.trim();
  if (!SLUG_PATTERN.test(slug)) {
    return invalid(slug || "(missing slug)", "slug must be lowercase kebab-case.");
  }
  if (seen.has(slug)) return invalid(slug, "duplicate slug.");
  seen.add(slug);

  if (!(projectStatuses as readonly string[]).includes(project.status)) {
    return invalid(slug, `"status" must be one of: ${projectStatuses.join(", ")}.`);
  }
  if (typeof project.sample !== "boolean") {
    return invalid(slug, `"sample" must be true or false.`);
  }
  if (
    !Array.isArray(project.tags) ||
    project.tags.some((tag) => typeof tag !== "string" || tag.trim() === "")
  ) {
    return invalid(slug, `"tags" must be a list of non-empty strings.`);
  }
  if (
    project.outline !== undefined &&
    (!Array.isArray(project.outline) ||
      project.outline.some((item) => typeof item !== "string" || item.trim() === ""))
  ) {
    return invalid(slug, `"outline" must be a list of non-empty strings.`);
  }

  const links = readLinks(slug, project.links);

  return {
    slug,
    title: requireText(slug, project.title, "title"),
    summary: requireText(slug, project.summary, "summary"),
    description: requireText(slug, project.description, "description"),
    status: project.status,
    sample: project.sample,
    tags: project.tags.map((tag) => tag.trim()),
    ...(project.outline ? { outline: project.outline.map((item) => item.trim()) } : {}),
    ...(links ? { links } : {}),
  };
}

const projects: readonly Project[] = (() => {
  const seen = new Set<string>();
  return projectContent.map((project) => readProject(project, seen));
})();

export function getAllProjects(): Project[] {
  return [...projects];
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/**
 * Look a project up by slug. The slug is only matched against the in-memory
 * list, so request input never reaches a file path.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  if (!SLUG_PATTERN.test(slug)) return undefined;
  return projects.find((project) => project.slug === slug);
}

/**
 * Resolve project slugs for a note. Unknown slugs are dropped, so a note never
 * links to a project that does not exist. Order follows the slugs given.
 */
export function getProjectsBySlugs(slugs: readonly string[] = []): Project[] {
  return slugs.flatMap((slug) => {
    const project = getProjectBySlug(slug);
    return project ? [project] : [];
  });
}
