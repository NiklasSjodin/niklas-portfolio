import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { NoteCategoryLabel } from "@/components/NoteMetadata";
import { Section } from "@/components/Section";
import { getAllNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Note not found",
};

export default async function NoteNotFound() {
  const notes = (await getAllNotes()).slice(0, 3);

  return (
    <Section ariaLabelledBy="note-not-found-heading">
      <div className="max-w-2xl">
        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
          404 · Note not found
        </p>
        <h1
          id="note-not-found-heading"
          className="font-display text-4xl tracking-tight text-text sm:text-5xl"
        >
          That note isn&rsquo;t in the notebook.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-text-muted">
          It may have been renamed, moved or never written. Browse everything
          in the notebook, or pick up one of the latest entries below.
        </p>
        <div className="mt-8">
          <Button href="/notes">Browse all notes</Button>
        </div>
      </div>

      {notes.length > 0 ? (
        <section aria-labelledby="latest-notes-heading" className="mt-16 max-w-2xl">
          <h2
            id="latest-notes-heading"
            className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
          >
            Latest notes
          </h2>
          <ul className="mt-4 border-t border-border">
            {notes.map((note) => (
              <li key={note.slug} className="border-b border-border">
                <Link
                  href={`/notes/${note.slug}`}
                  className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:text-champagne focus-visible:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <span className="flex flex-col gap-1.5">
                    <NoteCategoryLabel category={note.category} />
                    <span className="font-display text-2xl text-text transition-colors duration-300 group-hover:text-champagne">
                      {note.title}
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
