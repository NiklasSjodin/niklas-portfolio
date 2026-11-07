import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { ProjectStatusLabel } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Project not found",
};

export default function ProjectNotFound() {
  const projects = getAllProjects().slice(0, 3);

  return (
    <Section ariaLabelledBy="project-not-found-heading">
      <div className="max-w-2xl">
        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
          404 · Project not found
        </p>
        <h1
          id="project-not-found-heading"
          className="font-display text-4xl tracking-tight text-text sm:text-5xl"
        >
          That project isn&rsquo;t listed.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-text-muted">
          It may have been renamed, removed or never added. Browse the projects
          that are here, or pick one below.
        </p>
        <div className="mt-8">
          <Button href="/projects">Browse all projects</Button>
        </div>
      </div>

      {projects.length > 0 ? (
        <section aria-labelledby="listed-projects-heading" className="mt-16 max-w-2xl">
          <h2
            id="listed-projects-heading"
            className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
          >
            Projects
          </h2>
          <ul className="mt-4 border-t border-border">
            {projects.map((project) => (
              <li key={project.slug} className="border-b border-border">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:text-champagne focus-visible:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <span className="flex flex-col gap-1.5">
                    <ProjectStatusLabel status={project.status} />
                    <span className="font-display text-2xl text-text transition-colors duration-300 group-hover:text-champagne">
                      {project.title}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-champagne"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Section>
  );
}
