import type { Metadata } from "next";
import { NoteIndex } from "@/components/NoteIndex";
import { Section } from "@/components/Section";
import { getAllNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "A personal technical notebook: engineering, AI-assisted development, smart home automation and the occasional reflection.",
  alternates: { canonical: "/notes" },
};

export default async function NotesPage() {
  const notes = await getAllNotes();
  const hasDrafts = notes.some((note) => note.status === "draft");

  return (
    <Section ariaLabelledBy="notes-heading">
      <header className="max-w-2xl">
        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
          Notebook
        </p>
        <h1
          id="notes-heading"
          className="font-display text-4xl tracking-tight text-text sm:text-5xl"
        >
          Notes
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-text-muted">
          A personal technical notebook. Engineering, tooling, automation and
          the occasional reflection, written to think things through rather
          than to publish on a schedule.
        </p>
        {hasDrafts ? (
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            Entries marked{" "}
            <span className="text-champagne">Starter draft</span> are outlines.
            The writing is still to come.
          </p>
        ) : null}
      </header>

      {notes.length > 0 ? (
        <NoteIndex notes={notes} />
      ) : (
        <p className="mt-14 text-text-muted">
          Nothing in the notebook yet. Check back soon.
        </p>
      )}
    </Section>
  );
}
