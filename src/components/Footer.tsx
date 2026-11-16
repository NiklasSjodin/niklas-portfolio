import { ArrowUpRight, Mail, Rss } from "lucide-react";
import { Container } from "@/components/Container";
import { siteContact, siteName } from "@/lib/site";

const footerLinkClass =
  "inline-flex items-center gap-2 font-mono text-xs tracking-wide text-accent transition-colors hover:text-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

type FooterProps = {
  /** The RSS link is shown only once there are notes to subscribe to. */
  hasNotes: boolean;
};

export function Footer({ hasNotes }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-4 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 {siteName}.
        </p>
        <nav aria-label="Contact and feeds" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {siteContact.email ? (
            <a href={`mailto:${siteContact.email}`} className={footerLinkClass}>
              <Mail aria-hidden size={14} />
              Email
            </a>
          ) : null}
          <a
            href={siteContact.linkedin}
            className={footerLinkClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowUpRight aria-hidden size={14} />
            LinkedIn
          </a>
          {hasNotes ? (
            <a href="/feed.xml" className={footerLinkClass}>
              <Rss aria-hidden size={14} />
              RSS feed
            </a>
          ) : null}
        </nav>
      </Container>
    </footer>
  );
}
