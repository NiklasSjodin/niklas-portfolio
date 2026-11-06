import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoteContent } from "@/components/NoteContent";
import { NoteHeader } from "@/components/NoteHeader";
import { RelatedNotes } from "@/components/RelatedNotes";
import { RelatedProjects } from "@/components/RelatedProjects";
import { Section } from "@/components/Section";
import { getNoteBySlug, getNoteSlugs, getRelatedNotes } from "@/lib/notes";
import { getProjectsBySlugs } from "@/lib/projects";

export async function generateStaticParams() {
  const slugs = await getNoteSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    return { title: "Note not found" };
  }

  const url = `/notes/${note.slug}`;

  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: url },
    // Starter drafts are placeholders; keep them out of search results.
    robots: note.status === "draft" ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      url,
      title: note.title,
      description: note.description,
      publishedTime: note.date,
      tags: note.tags,
      authors: ["Niklas"],
    },
    twitter: {
      card: "summary",
      title: note.title,
      description: note.description,
    },
  };
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const titleId = "note-title";
  const relatedNotes = await getRelatedNotes(note);
  // Unknown project slugs are dropped, so only real projects are linked.
  const relatedProjects = getProjectsBySlugs(note.relatedProjects);

  return (
    <Section>
      <article aria-labelledby={titleId} className="max-w-3xl">
        <NoteHeader note={note} titleId={titleId} />

        <div className="mt-12 max-w-2xl sm:mt-16">
          <NoteContent source={note.content} />
        </div>

        <RelatedProjects projects={relatedProjects} />
      </article>

      <div className="max-w-3xl">
        <RelatedNotes notes={relatedNotes} />
      </div>
    </Section>
  );
}
