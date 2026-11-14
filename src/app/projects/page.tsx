import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Side projects by Niklas Sjödin: what each one is, how it is built and where it stands.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const hasSamples = projects.some((project) => project.sample);

  return (
    <Section ariaLabelledBy="projects-heading">
      <header className="max-w-2xl">
        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
          Selected work
        </p>
        <h1
          id="projects-heading"
          className="font-display text-4xl tracking-tight text-text sm:text-5xl"
        >
          Projects
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-text-muted">
          Things I build and explore in my own time. Each entry is a short
          account of what it is and where it stands.
        </p>
        {hasSamples ? (
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            Entries marked <span className="text-champagne">Sample</span> are
            outlines. The real write-up still has to be filled in.
          </p>
        ) : null}
      </header>

      {projects.length > 0 ? (
        <ul
          className={`mt-14 grid gap-6 sm:mt-20 ${projects.length > 1 ? "sm:grid-cols-2" : "max-w-2xl"}`}
        >
          {projects.map((project) => (
            <li key={project.slug} className="min-w-0">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-14 text-text-muted">
          No projects listed yet. Check back soon.
        </p>
      )}
    </Section>
  );
}
