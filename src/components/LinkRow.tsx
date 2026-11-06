import { ArrowUpRight } from "lucide-react";

type LinkRowProps = {
  href: string;
  label: string;
  value: string;
  external?: boolean;
};

export function LinkRow({ href, label, value, external = false }: LinkRowProps) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between gap-6 border-b border-border py-6 transition-colors duration-300 hover:text-champagne focus-visible:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="flex flex-col gap-2">
        <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          {label}
        </span>
        <span className="font-display text-2xl text-text transition-colors duration-300 group-hover:text-champagne sm:text-3xl">
          {value}
        </span>
      </span>
      <ArrowUpRight
        aria-hidden
        size={24}
        strokeWidth={1.5}
        className="shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-champagne group-focus-visible:text-champagne"
      />
    </a>
  );
}
