import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Note } from "@/lib/notes";
import { NoteCategoryLabel } from "@/components/NoteMetadata";

type RelatedNotesProps = {
  notes: Note[];
};

export function RelatedNotes({ notes }: RelatedNotesProps) {
  if (notes.length === 0) return null;

  return (
    <section aria-labelledby="related-notes-heading" className="mt-20">
      <h2
        id="related-notes-heading"
        className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
      >
        More from the notebook
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
  );
}
