import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { TastingCard } from "@/components/TastingCard";
import { latestTasting, nowItems, nowUpdated } from "@/content/now";
import { formatNoteDate, getAllNotes } from "@/lib/notes";
import { getAllProjects } from "@/lib/projects";

const eyebrow = "mb-4 font-mono text-xs tracking-[0.22em] text-accent uppercase";

export default async function HomePage() {
  const [latestNote] = await getAllNotes();
  const featuredProject = getAllProjects().find((project) => !project.sample);

  return (
    <>
      <Section
        ariaLabelledBy="hero-heading"
        className="relative overflow-x-clip"
        containerClassName="relative"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-72 left-1/2 -z-10 h-[34rem] w-full max-w-4xl -translate-x-1/2 rounded-full bg-accent/15 blur-[80px] sm:blur-[120px]"
        />

        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-16">
          <div className="relative size-28 overflow-hidden rounded-full border border-border bg-surface md:order-last md:size-60 lg:size-72">
            <Image
              src="/niklas.jpg"
              alt="Portrait of Niklas Sjödin"
              fill
              priority
              sizes="(min-width: 1024px) 18rem, (min-width: 768px) 15rem, 7rem"
              className="object-cover"
            />
          </div>

          <div>
            <p className="mb-6 font-mono text-xs tracking-[0.22em] text-accent uppercase">
              Hello, I’m
            </p>

            <h1
              id="hero-heading"
              className="font-display text-5xl leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-7xl"
            >
              Niklas Sjödin
            </h1>

            <p className="mt-5 max-w-xl font-display text-2xl text-champagne sm:text-3xl">
              Software engineer. Curious by default.
            </p>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-muted">
              I build backend systems in{" "}
              <span className="text-text">C# and .NET</span> for a living. Outside
              work I tinker with Home Assistant, do my best to get a little
              stronger, and rate ice cream far more seriously than anyone needs
              to.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/about">
                More about me
                <ArrowRight aria-hidden size={16} />
              </Button>
              <Button href="/contact" variant="secondary">
                Say hello
                <Mail aria-hidden size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section ariaLabelledBy="currently-heading" className="border-t border-border">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-20">
          <div>
            <p className={eyebrow}>Currently</p>
            <h2
              id="currently-heading"
              className="font-display text-3xl leading-tight tracking-tight text-text sm:text-4xl"
            >
              What I’m up to
            </h2>
            <p className="mt-5 text-text-muted">
              Updated {formatNoteDate(nowUpdated)}.{" "}
              <Link
                href="/now"
                className="text-champagne underline decoration-champagne/40 underline-offset-4 transition-colors hover:decoration-champagne"
              >
                More on the now page
              </Link>
              .
            </p>
          </div>

          <ul className="border-t border-border">
            {nowItems.map((item) => (
              <li
                key={item.label}
                className="group relative grid gap-2 border-b border-border py-7 sm:grid-cols-[7rem_1fr_auto] sm:gap-6"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase sm:pt-1.5">
                  {item.label}
                </span>
                <p className="text-lg leading-relaxed text-text">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="outline-none transition-colors group-hover:text-champagne after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ring"
                    >
                      {item.summary}
                    </Link>
                  ) : (
                    item.summary
                  )}
                </p>
                {item.href ? (
                  <ArrowUpRight
                    aria-hidden
                    size={18}
                    className="hidden text-text-muted transition-colors group-hover:text-champagne sm:mt-1.5 sm:block"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {featuredProject || latestNote || latestTasting ? (
        <Section ariaLabelledBy="latest-heading" className="border-t border-border">
          <p className={eyebrow}>Latest</p>
          <h2
            id="latest-heading"
            className="font-display text-3xl leading-tight tracking-tight text-text sm:text-4xl"
          >
            From the workshop
          </h2>

          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredProject ? (
              <li className="min-w-0">
                <ProjectCard project={featuredProject} headingLevel="h3" />
              </li>
            ) : null}
            {latestNote ? (
              <li className="min-w-0">
                <article className="group relative flex h-full flex-col rounded-lg border border-border bg-surface p-7 transition-colors duration-300 hover:border-accent sm:p-9">
                  <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                    Latest note · {latestNote.category}
                  </p>
                  <h3 className="mt-4 font-display text-3xl tracking-tight text-text text-balance transition-colors group-hover:text-champagne">
                    <Link
                      href={`/notes/${latestNote.slug}`}
                      className="outline-none after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ring"
                    >
                      {latestNote.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-text-muted">
                    {latestNote.description}
                  </p>
                  <p className="mt-auto pt-6 font-mono text-xs text-text-muted">
                    {formatNoteDate(latestNote.date)} ·{" "}
                    {latestNote.readingTimeMinutes} min read
                  </p>
                </article>
              </li>
            ) : null}
            {latestTasting ? (
              <li className="min-w-0">
                <TastingCard tasting={latestTasting} />
              </li>
            ) : null}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
