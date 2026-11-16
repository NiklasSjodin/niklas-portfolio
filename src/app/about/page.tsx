import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, House, IceCreamCone } from "lucide-react";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Niklas Sjödin — backend engineer focused on .NET integrations, Azure Functions and dependable data flows.",
};

type Interest = {
  index: string;
  title: string;
  body: ReactNode;
  icon: typeof Dumbbell;
};

const interests: Interest[] = [
  {
    index: "01",
    title: "Training",
    body: "Strength training, working towards getting a little stronger and more consistent.",
    icon: Dumbbell,
  },
  {
    index: "02",
    title: "Technology beyond work",
    body: "Smart home automation is what I experiment with most outside my day job. I enjoy finding clever ways to connect everyday devices with Home Assistant.",
    icon: House,
  },
  {
    index: "03",
    title: "A soft spot for ice cream",
    body: (
      <>
        Not everything has to be productive. I rate ice cream seriously enough
        that I built an app for it:{" "}
        <Link
          href="/projects/glass-atlas"
          className="text-champagne underline decoration-champagne/40 underline-offset-4 transition-colors hover:decoration-champagne"
        >
          Glass Atlas
        </Link>
        .
      </>
    ),
    icon: IceCreamCone,
  },
];

export default function AboutPage() {
  return (
    <>
      <Section ariaLabelledBy="about-heading" className="pt-14 sm:pt-20">
        <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] md:items-start lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-20">
          <div>
            <p className="mb-6 font-mono text-xs tracking-[0.22em] text-accent uppercase">
              About
            </p>
            <h1
              id="about-heading"
              className="max-w-2xl font-display text-5xl leading-[1.08] tracking-tight text-text sm:text-6xl"
            >
              A backend engineer, driven by curiosity.
            </h1>
            <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-text-muted">
              <p>
                I&rsquo;m{" "}
                <span className="text-text">Niklas</span>, a software engineer
                focused on backend development and integrations in the .NET
                ecosystem. I like understanding how systems fit together and
                making them reliable, observable and simple to run.
              </p>
              <p>
                I&rsquo;m naturally curious and like learning by doing. Whether
                it&rsquo;s exploring a new technology, improving a development
                workflow or starting a side project, I enjoy the process just as
                much as the result.
              </p>
            </div>
          </div>

          <figure className="m-0 md:mt-14">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-border bg-surface">
              <Image
                src="/niklas.jpg"
                alt="Portrait of Niklas Sjödin"
                fill
                priority
                sizes="(min-width: 1024px) 20rem, (min-width: 768px) 18rem, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </Section>

      <Section ariaLabelledBy="at-work-heading" className="border-t border-border">
        <div className="max-w-2xl">
          <h2
            id="at-work-heading"
            className="font-display text-3xl leading-tight tracking-tight text-text sm:text-4xl"
          >
            At work
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-muted">
            <p>
              I build integrations that move and process data between systems.
            </p>
            <p>
              Day to day that means C# and .NET, Azure Functions, CI/CD
              pipelines in Azure DevOps and containerised services running on
              Linux.
            </p>
            <p>
              I like integrations that fail loudly, are easy to debug and are
              boring to operate.
            </p>
          </div>
        </div>
      </Section>

      <Section ariaLabelledBy="more-heading" className="border-t border-border">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="mb-4 font-mono text-xs tracking-[0.22em] text-accent uppercase">
              Beyond the code
            </p>
            <h2
              id="more-heading"
              className="font-display text-3xl leading-tight tracking-tight text-text sm:text-4xl"
            >
              A little more about me
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-text-muted">
              When I’m not working with code, you’ll probably find me doing one
              of a few things.
            </p>
          </div>

          <ol className="border-t border-border">
            {interests.map((interest, position) => {
              const Icon = interest.icon;
              const headingId = `interest-${position}`;

              return (
                <li
                  key={interest.index}
                  className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-10 sm:gap-8 sm:py-12"
                >
                  <span className="flex size-14 items-center justify-center rounded-full border border-border bg-surface text-champagne">
                    <Icon aria-hidden size={24} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-mono text-xs tracking-[0.2em] text-accent">
                      {interest.index}
                    </p>
                    <h3
                      id={headingId}
                      className="mt-2 font-display text-2xl text-text sm:text-3xl"
                    >
                      {interest.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-text-muted">
                      {interest.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      <Section
        ariaLabelledBy="curiosity-heading"
        className="border-t border-border"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="curiosity-heading"
            className="font-mono text-xs tracking-[0.22em] text-accent uppercase"
          >
            What keeps me curious
          </h2>
          <p className="mt-8 font-display text-3xl leading-snug text-text sm:text-4xl">
            I’m always interested in discovering something new, whether it’s a
            technical idea, a different way of thinking or something completely
            unrelated to software.
          </p>
          <p className="mt-8 text-lg leading-relaxed text-text-muted">
            I believe curiosity makes life more interesting — and makes us
            better at what we do.
          </p>
          <div aria-hidden className="mx-auto mt-12 h-px w-16 bg-champagne/60" />
          <p className="mt-10 font-display text-2xl text-champagne sm:text-3xl">
            Always learning. Always building.
            <br />
            Occasionally eating ice cream.
          </p>
        </div>
      </Section>
    </>
  );
}