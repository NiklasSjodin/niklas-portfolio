"use client";

import { useState } from "react";
import { NoteCard } from "@/components/NoteCard";
import {
  noteCategories,
  type Note,
  type NoteCategory,
} from "@/lib/note-model";

type NoteIndexProps = {
  notes: Note[];
};

type Filter = NoteCategory | "all";

function menuItemClass(active: boolean) {
  return [
    "rounded-sm py-1 font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
    active
      ? "text-champagne underline decoration-champagne/80 underline-offset-4"
      : "text-text-muted hover:text-text",
  ].join(" ");
}

/**
 * Category quick-menu and the filtered notebook list. Filtering happens in the
 * browser so the listing stays a static page.
 */
export function NoteIndex({ notes }: NoteIndexProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible =
    filter === "all"
      ? notes
      : notes.filter((note) => note.category === filter);

  const summary =
    visible.length === 0
      ? `No notes in ${filter}.`
      : filter === "all"
        ? `Showing all ${notes.length} notes.`
        : `Showing ${visible.length} ${visible.length === 1 ? "note" : "notes"} in ${filter}.`;

  return (
    <>
      <nav aria-label="Categories" className="mt-12 max-w-2xl sm:mt-16">
        <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <li className="flex items-center gap-8">
            <button
              type="button"
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
              className={menuItemClass(filter === "all")}
            >
              All
            </button>
            <span aria-hidden className="h-3 w-px bg-border" />
          </li>
          {noteCategories.map((category) => (
            <li key={category}>
              <button
                type="button"
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
                className={menuItemClass(filter === category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <p className="sr-only" aria-live="polite">
        {summary}
      </p>

      {visible.length > 0 ? (
        <ol
          aria-label={filter === "all" ? "All notes" : `Notes in ${filter}`}
          className="mt-8 divide-y divide-border border-y border-border sm:mt-10"
        >
          {visible.map((note) => (
            <li key={note.slug}>
              <NoteCard note={note} />
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-10 border-t border-border pt-10 text-text-muted">
          {filter === "all"
            ? "Nothing in the notebook yet. Check back soon."
            : `Nothing filed under ${filter} yet.`}
        </p>
      )}
    </>
  );
}
