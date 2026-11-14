import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/Button";
import { ProjectStatusLabel } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const projects = getAllProjects().slice(0, 3);

  return (
    <Section ariaLabelledBy="not-found-heading">
      <div className="max-w-2xl">
        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
          404 · Page not found
        </p>
        <h1
          id="not-found-heading"
          className="font-display text-4xl tracking-tight text-text sm:text-5xl"
        >
          That page isn&rsquo;t here.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-text-muted">
          The link may be wrong, or the page may have moved. Try the home page,
          or pick a project below.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href="/">
            Home
            <Home aria-hidden size={16} />
          </Button>
          <Button href="/projects" variant="secondary">
            Projects
          </Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </div>

      {projects.length > 0 ? (
        <section aria-labelledby="not-found-projects-heading" className="mt-16 max-w-2xl">
          <h2
            id="not-found-projects-heading"
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