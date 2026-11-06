import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software projects by Niklas.",
};

export default function ProjectsPage() {
  return (
    <Section ariaLabelledBy="projects-heading">
      <PageIntro
        id="projects-heading"
        title="Projects"
        description="Selected work will live here — backend systems, APIs, and automation I am proud of. Content is on the way."
      />
    </Section>
  );
}
