import { formatNoteDate, type Note } from "@/lib/note-model";

type NoteMetadataProps = {
  note: Pick<Note, "date" | "readingTimeMinutes">;
  /** `stacked` puts date and reading time on separate lines (listing rows). */
  layout?: "inline" | "stacked";
  className?: string;
};

export function NoteMetadata({
  note,
  layout = "inline",
  className = "",
}: NoteMetadataProps) {
  const base = "font-mono text-xs tracking-wide text-text-muted";

  if (layout === "stacked") {
    return (
      <p className={`${base} flex flex-col gap-1 ${className}`.trim()}>
        <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
        <span>{note.readingTimeMinutes} min read</span>
      </p>
    );
  }

  return (
    <p
      className={`${base} flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`.trim()}
    >
      <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
      <span aria-hidden>·</span>
      <span>{note.readingTimeMinutes} min read</span>
    </p>
  );
}

export function NoteCategoryLabel({ category }: Pick<Note, "category">) {
  return (
    <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
      {category}
    </span>
  );
}

export function NoteDraftBadge() {
  return (
    <span className="rounded-full border border-champagne/50 px-2.5 py-0.5 font-mono text-[0.6875rem] tracking-[0.15em] text-champagne uppercase">
      Starter draft
    </span>
  );
}

export function NoteTags({ tags }: Pick<Note, "tags">) {
  if (tags.length === 0) return null;

  return (
    <ul
      aria-label="Tags"
      className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-muted"
    >
      {tags.map((tag) => (
        <li key={tag}>
          <span aria-hidden className="text-accent/70">
            #
          </span>
          {tag}
        </li>
      ))}
    </ul>
  );
}
