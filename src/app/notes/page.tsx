import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Notes",
  description: "Notes and writing by Niklas.",
};

export default function NotesPage() {
  return (
    <Section ariaLabelledBy="notes-heading">
      <PageIntro
        id="notes-heading"
        title="Notes"
        description="Short technical notes and reflections will appear here. No CMS yet — just a quiet place for writing."
      />
    </Section>
  );
}
