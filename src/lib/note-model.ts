/** The only categories a note may use. Keep in sync with the Notes copy. */
export const noteCategories = [
  "Engineering",
  "AI & Productivity",
  "Smart Home & Automation",
  "Personal Thoughts",
  "Technical implementation",
] as const;

export type NoteCategory = (typeof noteCategories)[number];

/** `draft` notes are shown with a visible "Starter draft" label and are not indexed. */
export type NoteStatus = "draft" | "published";

/** The shape of the YAML frontmatter at the top of every `.mdx` note. */
export type NoteFrontmatter = {
  title: string;
  description: string;
  /** ISO calendar date, `YYYY-MM-DD`. */
  date: string;
  category: NoteCategory;
  tags: string[];
  status: NoteStatus;
  /** Optional project slugs. Only slugs that exist in `lib/projects.ts` are shown. */
  relatedProjects?: string[];
};

export type Note = NoteFrontmatter & {
  slug: string;
  wordCount: number;
  readingTimeMinutes: number;
};

/** Formats an ISO `YYYY-MM-DD` date, e.g. "6 November 2026". Timezone-stable. */
export function formatNoteDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
