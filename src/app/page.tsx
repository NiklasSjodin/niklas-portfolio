import { ArrowRight, Code2, Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";

export default function HomePage() {
  return (
    <Section
      ariaLabelledBy="hero-heading"
      className="relative overflow-hidden"
      containerClassName="relative"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_70%)]"
      />

      <p className="mb-6 font-mono text-xs tracking-[0.22em] text-accent uppercase">
        Portfolio
      </p>

      <h1
        id="hero-heading"
        className="max-w-3xl font-display text-5xl leading-[1.1] tracking-tight text-text sm:text-6xl lg:text-7xl"
      >
        Niklas — Software Developer
      </h1>

      <p className="mt-5 max-w-xl font-display text-2xl text-champagne sm:text-3xl">
        Building thoughtful software.
      </p>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-muted">
        I work primarily with{" "}
        <span className="text-text">C# and .NET</span>, designing reliable
        backend systems, clear APIs, and the testing and automation that keep
        them trustworthy. I care about readable code, careful contracts, and
        shipping work that holds up in production.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button href="/projects">
          Projects
          <ArrowRight aria-hidden size={16} />
        </Button>
        <Button href="/contact" variant="secondary">
          Contact
          <Mail aria-hidden size={16} />
        </Button>
      </div>

      <ul className="mt-14 flex flex-wrap gap-3" aria-label="Focus areas">
        {["C# / .NET", "Backend", "APIs", "Testing", "Automation"].map(
          (item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-text-muted"
            >
              <Code2 aria-hidden size={14} className="text-accent" />
              {item}
            </li>
          ),
        )}
      </ul>
    </Section>
  );
}
