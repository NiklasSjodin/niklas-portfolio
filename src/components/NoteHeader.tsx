import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Note } from "@/lib/notes";
import {
  NoteCategoryLabel,
  NoteDraftBadge,
  NoteMetadata,
  NoteTags,
} from "@/components/NoteMetadata";

type NoteHeaderProps = {
  note: Note;
  titleId: string;
};

export function NoteHeader({ note, titleId }: NoteHeaderProps) {
  return (
    <header>
      <Link
        href="/notes"
        className="group inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-300 hover:text-champagne focus-visible:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <ArrowLeft
          aria-hidden
          size={16}
          strokeWidth={1.5}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
        All notes
      </Link>

      <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2">
        <NoteCategoryLabel category={note.category} />
        {note.status === "draft" ? <NoteDraftBadge /> : null}
      </div>

      <h1
        id={titleId}
        className="mt-4 font-display text-4xl tracking-tight text-text text-balance sm:text-5xl md:text-6xl"
      >
        {note.title}
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-text-muted sm:text-xl">
        {note.description}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-border py-4">
        <NoteMetadata note={note} />
        <NoteTags tags={note.tags} />
      </div>

      {note.status === "draft" ? (
        <p className="mt-8 rounded-lg border border-dashed border-champagne/50 bg-champagne/5 p-5 text-sm leading-relaxed text-text-muted">
          <strong className="font-medium text-champagne">Starter draft.</strong>{" "}
          This note is an outline. Sections marked{" "}
          <em className="not-italic text-text">Needs input</em> are waiting for
          real experience and have not been written yet.
        </p>
      ) : null}
    </header>
  );
}
