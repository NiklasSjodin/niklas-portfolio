import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-2 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Niklas. Built with care.</p>
        <p className="font-mono text-xs tracking-wide text-accent">
          C# · .NET · APIs · Automation
        </p>
      </Container>
    </footer>
  );
}
