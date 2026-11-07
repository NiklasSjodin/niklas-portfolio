import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  projectStatusLabels,
  type Project,
  type ProjectStatus,
} from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectStatusLabel({ status }: { status: ProjectStatus }) {
  return (
    <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
      {projectStatusLabels[status]}
    </span>
  );
}

export function ProjectSampleBadge() {
  return (
    <span className="rounded-full border border-champagne/50 px-2.5 py-0.5 font-mono text-[0.6875rem] tracking-[0.15em] text-champagne uppercase">
      Sample
    </span>
  );
}

export function ProjectTags({ tags }: { tags: readonly string[] }) {
  if (tags.length === 0) return null;

  return (
    <ul
      aria-label="Tags"
      className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-muted"
    >
      {tags.map((tag) => (
        <li key={tag}>
          <span aria-hidden className="text-accent/70">
            #
          </span>
          {tag}
        </li>
      ))}
    </ul>
  );
}

/**
 * One project on the index. The title link covers the card, so the whole
 * surface is clickable without nesting links.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border bg-surface p-7 transition-colors duration-300 hover:border-accent sm:p-9">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <ProjectStatusLabel status={project.status} />
          {project.sample ? <ProjectSampleBadge /> : null}
        </div>
        <ArrowUpRight
          aria-hidden
          size={20}
          strokeWidth={1.5}
          className="mt-0.5 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-champagne"
        />
      </div>

      <h2 className="mt-4 font-display text-3xl tracking-tight text-text text-balance transition-colors duration-300 group-hover:text-champagne">
        <Link
          href={`/projects/${project.slug}`}
          className="outline-none after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-ring"
        >
          {project.title}
        </Link>
      </h2>

      <p className="mt-3 flex-1 leading-relaxed text-text-muted">
        {project.summary}
      </p>

      <div className="mt-6">
        <ProjectTags tags={project.tags} />
      </div>
    </article>
  );
}
