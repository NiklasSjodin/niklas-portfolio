import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import {
  ProjectSampleBadge,
  ProjectStatusLabel,
  ProjectTags,
} from "@/components/ProjectCard";
import { ProjectLinks } from "@/components/ProjectLinks";
import { Section } from "@/components/Section";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const url = `/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    // Sample outlines are placeholders; keep them out of search results.
    robots: project.sample ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      url,
      title: project.title,
      description: project.description,
      tags: project.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  };
}

export default function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  return (
    <Section>
      <div className="max-w-3xl">
        <BackToProjects />
        <Suspense fallback={<ProjectArticleFallback />}>
          <ProjectArticle params={params} />
        </Suspense>
      </div>
    </Section>
  );
}

async function ProjectArticle({
  params,
}: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const titleId = "project-title";

  return (
    <article aria-labelledby={titleId}>
        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2">
          <ProjectStatusLabel status={project.status} />
          {project.sample ? <ProjectSampleBadge /> : null}
        </div>

        <h1
          id={titleId}
          className="mt-4 font-display text-4xl tracking-tight text-text text-balance sm:text-5xl md:text-6xl"
        >
          {project.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
          {project.description}
        </p>

        {project.tags.length > 0 ? (
          <div className="mt-8 border-y border-border py-4">
            <ProjectTags tags={project.tags} />
          </div>
        ) : null}

        {project.images && project.images.length > 0 ? (
          <div className="mt-12 space-y-8">
            {project.images.map((image) => (
              <figure key={image.src} className="m-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className="h-auto w-full rounded-lg border border-border bg-surface"
                />
                {image.caption ? (
                  <figcaption className="mt-3 text-sm text-text-muted">
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        ) : null}

        {project.sections?.map((section, position) => (
          <section
            key={section.heading}
            aria-labelledby={`project-section-${position}`}
            className="mt-14 max-w-2xl"
          >
            <h2
              id={`project-section-${position}`}
              className="font-display text-3xl tracking-tight text-text"
            >
              {section.heading}
            </h2>
            {section.body.split(/\n\s*\n/).map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 text-lg leading-relaxed text-text-muted"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        {project.sample ? (
          <p className="mt-8 max-w-2xl rounded-lg border border-dashed border-champagne/50 bg-champagne/5 p-5 text-sm leading-relaxed text-text-muted">
            <strong className="font-medium text-champagne">Sample entry.</strong>{" "}
            This is an outline, not a finished case study. Nothing below is a
            completed feature, a result or a link.
          </p>
        ) : null}

        {project.outline && project.outline.length > 0 ? (
          <section aria-labelledby="project-outline-heading" className="mt-14 max-w-2xl">
            <h2
              id="project-outline-heading"
              className="font-display text-3xl tracking-tight text-text"
            >
              Still to write
            </h2>
            <ul className="mt-6 list-disc space-y-2 pl-6 leading-8 text-text/90 marker:text-accent">
              {project.outline.map((item) => (
                <li key={item} className="pl-1">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <ProjectLinks links={project.links} />
      </article>
  );
}

function BackToProjects() {
  return (
    <Link
      href="/projects"
      className="group inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-300 hover:text-champagne focus-visible:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      <ArrowLeft
        aria-hidden
        size={16}
        strokeWidth={1.5}
        className="transition-transform duration-300 group-hover:-translate-x-0.5"
      />
      All projects
    </Link>
  );
}

function ProjectArticleFallback() {
  return (
    <div className="mt-12 max-w-2xl" aria-busy="true">
      <p className="sr-only" role="status">
        Loading project
      </p>
      <div className="h-3 w-28 rounded-full bg-surface" />
      <div className="mt-6 h-12 w-2/3 rounded bg-surface" />
      <div className="mt-6 h-4 w-full rounded bg-surface" />
      <div className="mt-3 h-4 w-4/5 rounded bg-surface" />
    </div>
  );
}
