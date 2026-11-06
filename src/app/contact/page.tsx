import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Niklas.",
};

export default function ContactPage() {
  return (
    <Section ariaLabelledBy="contact-heading">
      <PageIntro
        id="contact-heading"
        title="Contact"
        description="Prefer email or a short message? Contact details and a simple way to reach me will be added here next."
      />
    </Section>
  );
}
