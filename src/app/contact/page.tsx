import type { Metadata } from "next";
import { LinkRow } from "@/components/LinkRow";
import { Section } from "@/components/Section";
import { siteContact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Niklas about software, technology, or just to exchange ideas.",
};

export default function ContactPage() {
  return (
    <Section ariaLabelledBy="contact-heading" className="pt-14 sm:pt-20">
      <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-20">
        <div>
          <p className="mb-6 font-mono text-xs tracking-[0.22em] text-accent uppercase">
            Contact
          </p>
          <h1
            id="contact-heading"
            className="font-display text-5xl leading-[1.08] tracking-tight text-text sm:text-6xl"
          >
            Have something in mind?
          </h1>
          <div className="mt-10 max-w-xl space-y-6 text-lg leading-relaxed text-text-muted">
            <p>
              I’m always happy to connect with people who share an interest in
              technology, software development or just enjoy exchanging ideas.
            </p>
            <p>
              Have a project in mind, a question, or simply want to say hello?
              Feel free to reach out.
            </p>
          </div>
        </div>

        <div className="md:pt-24">
          <h2 className="mb-2 font-mono text-xs tracking-[0.22em] text-accent uppercase">
            Get in touch
          </h2>
          <ul className="border-t border-border">
            {siteContact.email ? (
              <li>
                <LinkRow
                  href={`mailto:${siteContact.email}`}
                  label="Email"
                  value={siteContact.email}
                />
              </li>
            ) : null}
            <li>
              <LinkRow
                href={siteContact.linkedin}
                label="LinkedIn"
                value="Niklas Sjödin"
                external
              />
            </li>
            <li>
              <LinkRow
                href={siteContact.github}
                label="GitHub"
                value="NiklasSjodin"
                external
              />
            </li>
          </ul>

          <p className="mt-12 font-display text-2xl text-champagne">
            Thanks for stopping by.
          </p>
        </div>
      </div>
    </Section>
  );
}
