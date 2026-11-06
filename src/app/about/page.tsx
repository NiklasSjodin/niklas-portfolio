import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description: "About Niklas — software developer.",
};

export default function AboutPage() {
  return (
    <Section ariaLabelledBy="about-heading">
      <PageIntro
        id="about-heading"
        title="About"
        description="A longer introduction, background, and how I like to work will land here soon."
      />
    </Section>
  );
}
