import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { nowItems, nowUpdated } from "@/content/now";
import { formatNoteDate } from "@/lib/note-model";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Niklas Sjödin is focused on right now: what he is building, tinkering with and working towards.",
  alternates: { canonical: "/now" },
};

export default function NowPage() {
  return (
    <Section ariaLabelledBy="now-heading" className="pt-14 sm:pt-20">
      <div className="max-w-3xl">
        <p className="mb-6 font-mono text-xs tracking-[0.22em] text-accent uppercase">
          Now
        </p>
        <h1
          id="now-heading"
          className="font-display text-5xl leading-[1.08] tracking-tight text-text sm:text-6xl"
        >
          What I’m focused on right now
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-muted">
          A snapshot of what has my attention at the moment, in and outside of
          work. It changes when life does.
        </p>
        <p className="mt-4 font-mono text-xs tracking-wide text-text-muted">
          Last updated{" "}
          <time dateTime={nowUpdated} className="text-champagne">
            {formatNoteDate(nowUpdated)}
          </time>
        </p>

        <ol className="mt-14 border-t border-border">
          {nowItems.map((item) => (
            <li
              key={item.label}
              className="grid gap-3 border-b border-border py-10 sm:grid-cols-[8rem_1fr] sm:gap-8"
            >
              <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase sm:pt-2">
                {item.label}
              </span>
              <div>
                <p className="font-display text-2xl leading-snug text-text sm:text-3xl">
                  {item.summary}
                </p>
                {item.detail ? (
                  <p className="mt-4 text-lg leading-relaxed text-text-muted">
                    {item.detail}
                  </p>
                ) : null}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group mt-5 inline-flex items-center gap-2 text-sm text-champagne transition-colors hover:text-text"
                  >
                    Read more
                    <ArrowRight
                      aria-hidden
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-sm leading-relaxed text-text-muted">
          This is a{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-champagne underline decoration-champagne/40 underline-offset-4 transition-colors hover:decoration-champagne"
          >
            now page
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          , an idea borrowed from many personal sites.
        </p>
      </div>
    </Section>
  );
}
