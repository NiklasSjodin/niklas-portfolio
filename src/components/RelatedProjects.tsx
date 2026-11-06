import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

type RelatedProjectsProps = {
  /** Already resolved projects. Renders nothing when the list is empty. */
  projects: Project[];
};

const rowClassName =
  "group flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:text-champagne focus-visible:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

function RowContent({ project }: { project: Project }) {
  return (
    <>
      <span className="flex flex-col gap-1.5">
        <span className="font-display text-2xl text-text transition-colors duration-300 group-hover:text-champagne">
          {project.title}
        </span>
        <span className="text-sm leading-relaxed text-text-muted">
          {project.summary}
        </span>
      </span>
      <ArrowUpRight
        aria-hidden
        size={20}
        strokeWidth={1.5}
        className="shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-champagne"
      />
    </>
  );
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="related-projects-heading" className="mt-20">
      <h2
        id="related-projects-heading"
        className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
      >
        Related projects
      </h2>

      <ul className="mt-4 border-t border-border">
        {projects.map((project) => (
          <li key={project.slug} className="border-b border-border">
            {project.href.startsWith("/") ? (
              <Link href={project.href} className={rowClassName}>
                <RowContent project={project} />
              </Link>
            ) : (
              <a
                href={project.href}
                className={rowClassName}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RowContent project={project} />
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
