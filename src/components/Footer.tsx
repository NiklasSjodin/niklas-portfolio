import { Rss } from "lucide-react";
import { Container } from "@/components/Container";
import { siteName } from "@/lib/site";

type FooterProps = {
  /** The RSS link is shown only once there are notes to subscribe to. */
  hasNotes: boolean;
};

export function Footer({ hasNotes }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-2 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 {siteName}. Powered by curiosity and ice cream.
        </p>
        {hasNotes ? (
          <a
            href="/feed.xml"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-accent transition-colors hover:text-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Rss aria-hidden size={14} />
            RSS feed
          </a>
        ) : null}
      </Container>
    </footer>
  );
}
