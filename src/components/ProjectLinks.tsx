import type { ProjectLinks as ProjectLinkFields } from "@/types/project";

type ProjectLinksProps = {
  links?: ProjectLinkFields;
};

const linkClassName =
  "text-champagne underline decoration-champagne/40 underline-offset-4 transition-colors duration-200 hover:decoration-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

/**
 * Renders nothing when a project has no repository or demo. Each link is
 * optional on its own.
 */
export function ProjectLinks({ links }: ProjectLinksProps) {
  const items = [
    links?.github ? { label: "GitHub", href: links.github } : null,
    links?.demo ? { label: "Demo", href: links.demo } : null,
  ].filter((item): item is { label: string; href: string } => item !== null);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="project-links-heading" className="mt-14">
      <h2
        id="project-links-heading"
        className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
      >
        Links
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className={linkClassName}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
