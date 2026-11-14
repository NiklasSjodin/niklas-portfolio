import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parse as parseYaml } from "yaml";
import {
  noteCategories,
  type Note,
  type NoteCategory,
  type NoteFrontmatter,
} from "@/lib/note-model";
import { showUnfinished } from "@/lib/visibility";

export { formatNoteDate, noteCategories } from "@/lib/note-model";
export type {
  Note,
  NoteCategory,
  NoteFrontmatter,
  NoteStatus,
} from "@/lib/note-model";

export type NoteWithContent = Note & {
  /** MDX body without the frontmatter block. */
  content: string;
};

const NOTES_DIR = path.join(process.cwd(), "src", "content", "notes");
const NOTE_EXTENSION = ".mdx";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const WORDS_PER_MINUTE = 200;

function invalid(slug: string, problem: string): never {
  throw new Error(`Invalid note "${slug}${NOTE_EXTENSION}": ${problem}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(
  slug: string,
  data: Record<string, unknown>,
  key: string,
): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    return invalid(slug, `"${key}" must be a non-empty string.`);
  }
  return value.trim();
}

function readStringList(
  slug: string,
  data: Record<string, unknown>,
  key: string,
): string[] | undefined {
  const value = data[key];
  if (value === undefined) return undefined;
  if (
    !Array.isArray(value) ||
    !value.every((item) => typeof item === "string" && item.trim() !== "")
  ) {
    return invalid(slug, `"${key}" must be a list of non-empty strings.`);
  }
  return value.map((item: string) => item.trim());
}

function isCategory(value: string): value is NoteCategory {
  return (noteCategories as readonly string[]).includes(value);
}

function parseFrontmatter(
  slug: string,
  data: unknown,
): NoteFrontmatter {
  if (!isRecord(data)) {
    return invalid(slug, "missing frontmatter block.");
  }

  const title = requireString(slug, data, "title");
  const description = requireString(slug, data, "description");

  const date = requireString(slug, data, "date");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(new Date(`${date}T00:00:00Z`).getTime())
  ) {
    return invalid(slug, `"date" must be a valid YYYY-MM-DD date.`);
  }

  const category = requireString(slug, data, "category");
  if (!isCategory(category)) {
    return invalid(
      slug,
      `"category" must be one of: ${noteCategories.join(", ")}.`,
    );
  }

  const tags = readStringList(slug, data, "tags") ?? [];

  const status = data.status ?? "published";
  if (status !== "draft" && status !== "published") {
    return invalid(slug, `"status" must be "draft" or "published".`);
  }

  const relatedProjects = readStringList(slug, data, "relatedProjects");

  return {
    title,
    description,
    date,
    category,
    tags,
    status,
    ...(relatedProjects ? { relatedProjects } : {}),
  };
}

function countWords(body: string): number {
  const prose = body
    .replace(/```[\s\S]*?```/g, " ") // skip code blocks
    .replace(/<[^>]+>/g, " ") // skip JSX tags, keep their text
    .replace(/[#>*_`[\]()-]/g, " ");
  return prose.split(/\s+/).filter(Boolean).length;
}

function parseNote(slug: string, raw: string): NoteWithContent {
  const match = FRONTMATTER_PATTERN.exec(raw);
  if (!match) return invalid(slug, "missing frontmatter block.");

  let data: unknown;
  try {
    data = parseYaml(match[1]);
  } catch {
    return invalid(slug, "frontmatter is not valid YAML.");
  }

  const content = raw.slice(match[0].length).trim();
  const wordCount = countWords(content);

  return {
    ...parseFrontmatter(slug, data),
    slug,
    content,
    wordCount,
    readingTimeMinutes: Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE)),
  };
}

/**
 * Reads and validates every note once per render pass, newest first.
 *
 * Reads are synchronous on purpose: with Cache Components, `fs.readFileSync`
 * is treated as a predictable value and is included in the static shell,
 * whereas an awaited `fs/promises` read would count as uncached I/O.
 */
const loadAllNotes = cache((): NoteWithContent[] => {
  const slugs = readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith(NOTE_EXTENSION))
    .map((file) => file.slice(0, -NOTE_EXTENSION.length));

  return slugs
    .map((slug) => {
      if (!SLUG_PATTERN.test(slug)) {
        return invalid(slug, "file name must be lowercase kebab-case.");
      }
      const raw = readFileSync(
        path.join(NOTES_DIR, `${slug}${NOTE_EXTENSION}`),
        "utf8",
      );
      return parseNote(slug, raw);
    })
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
    );
});

/** Notes visible in this build: starter drafts are left out of production. */
const loadNotes = cache((): NoteWithContent[] =>
  loadAllNotes().filter(
    (note) => showUnfinished || note.status === "published",
  ),
);

function withoutContent({ content, ...note }: NoteWithContent): Note {
  void content;
  return note;
}

export async function getAllNotes(): Promise<Note[]> {
  return loadNotes().map(withoutContent);
}

/**
 * Every note file's slug, drafts included. Used for `generateStaticParams`,
 * which must return at least one entry; a hidden draft then renders as 404.
 */
export async function getNoteSlugs(): Promise<string[]> {
  return loadAllNotes().map((note) => note.slug);
}

/**
 * Look a note up by slug. The slug is only ever matched against notes that were
 * loaded from disk, so request input never reaches a file path.
 */
export async function getNoteBySlug(
  slug: string,
): Promise<NoteWithContent | undefined> {
  if (!SLUG_PATTERN.test(slug)) return undefined;
  return loadNotes().find((note) => note.slug === slug);
}

/**
 * Notes related to `note`, ranked by shared tags and category. If fewer than
 * `limit` are related, the list is topped up with the most recent other notes.
 */
export async function getRelatedNotes(
  note: Pick<Note, "slug" | "category" | "tags">,
  limit = 3,
): Promise<Note[]> {
  const others = (await getAllNotes()).filter(
    (candidate) => candidate.slug !== note.slug,
  );

  const score = (candidate: Note) =>
    candidate.tags.filter((tag) => note.tags.includes(tag)).length * 2 +
    (candidate.category === note.category ? 1 : 0);

  const related = others
    .filter((candidate) => score(candidate) > 0)
    .sort((a, b) => score(b) - score(a));
  const rest = others.filter((candidate) => !related.includes(candidate));

  return [...related, ...rest].slice(0, limit);
}
