import Link from "next/link";
import type { Note } from "@/lib/notes";
import {
  NoteCategoryLabel,
  NoteDraftBadge,
  NoteMetadata,
  NoteTags,
} from "@/components/NoteMetadata";

type NoteCardProps = {
  note: Note;
};

/**
 * A single entry in the notebook index. Deliberately a ruled row rather than a
 * boxed card; the whole row is clickable through the title link.
 */
export function NoteCard({ note }: NoteCardProps) {
  return (
    <article className="group relative grid gap-4 py-10 sm:grid-cols-[10rem_1fr] sm:gap-10">
      <NoteMetadata note={note} layout="stacked" className="sm:pt-2.5" />

      <div className="max-w-2xl">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <NoteCategoryLabel category={note.category} />
          {note.status === "draft" ? <NoteDraftBadge /> : null}
        </div>

        <h2 className="mt-3 font-display text-3xl tracking-tight text-text text-balance transition-colors duration-300 group-hover:text-champagne sm:text-4xl">
          <Link
            href={`/notes/${note.slug}`}
            className="outline-none after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ring"
          >
            {note.title}
          </Link>
        </h2>

        <p className="mt-3 leading-relaxed text-text-muted">
          {note.description}
        </p>

        <div className="mt-5">
          <NoteTags tags={note.tags} />
        </div>
      </div>
    </article>
  );
}
