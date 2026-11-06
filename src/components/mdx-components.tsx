import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import {
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

type MDXComponents = NonNullable<MDXRemoteProps["components"]>;

function Heading2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="mt-16 font-display text-3xl tracking-tight text-text text-balance sm:text-4xl"
      {...props}
    />
  );
}

function Heading3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3 className="mt-10 text-xl font-medium tracking-tight text-text" {...props} />
  );
}

function Paragraph(props: ComponentPropsWithoutRef<"p">) {
  return (
    <p className="mt-6 text-[1.0625rem] leading-8 text-text/90" {...props} />
  );
}

function Anchor({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const className =
    "text-champagne underline decoration-champagne/40 underline-offset-4 transition-colors duration-200 hover:decoration-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
}

function UnorderedList(props: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className="mt-6 list-disc space-y-2 pl-6 text-[1.0625rem] leading-8 text-text/90 marker:text-accent"
      {...props}
    />
  );
}

function OrderedList(props: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className="mt-6 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-8 text-text/90 marker:font-mono marker:text-accent"
      {...props}
    />
  );
}

function ListItem(props: ComponentPropsWithoutRef<"li">) {
  return <li className="pl-1" {...props} />;
}

function Blockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="mt-8 border-l-2 border-champagne/60 pl-6 font-display text-2xl leading-snug text-text [&_p]:mt-4 [&_p]:text-[inherit] [&_p]:leading-[inherit] [&>p:first-child]:mt-0"
      {...props}
    />
  );
}

function Strong(props: ComponentPropsWithoutRef<"strong">) {
  return <strong className="font-semibold text-text" {...props} />;
}

function Rule() {
  return <hr className="my-14 border-border" />;
}

function InlineCode(props: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.875em] text-champagne"
      {...props}
    />
  );
}

function getLanguage(children: ReactNode): string | undefined {
  if (!isValidElement<{ className?: string }>(children)) return undefined;
  return /language-([\w-]+)/.exec(children.props.className ?? "")?.[1];
}

/** Fenced code block. The scroll region is focusable so keyboard users can pan it. */
function CodeBlock({ children, ...rest }: ComponentPropsWithoutRef<"pre">) {
  const language = getLanguage(children);

  return (
    <figure className="mt-8 overflow-hidden rounded-lg border border-border bg-black/25">
      {language ? (
        <figcaption className="border-b border-border bg-surface px-4 py-2 font-mono text-[0.6875rem] tracking-[0.2em] text-text-muted uppercase">
          {language}
        </figcaption>
      ) : null}
      <pre
        tabIndex={0}
        className="overflow-x-auto p-4 font-mono text-sm leading-7 text-text focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:p-5 [&>code]:rounded-none [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[1em] [&>code]:text-inherit"
        {...rest}
      >
        {children}
      </pre>
    </figure>
  );
}

type NeedsInputProps = {
  title?: string;
  children: ReactNode;
};

/**
 * Marks a section of a starter draft that still needs the author's own
 * experience. Never fill these with invented details.
 */
function NeedsInput({ title, children }: NeedsInputProps) {
  return (
    <aside className="mt-8 rounded-lg border border-dashed border-champagne/50 bg-champagne/5 p-5 sm:p-6">
      <p className="font-mono text-xs tracking-[0.2em] text-champagne uppercase">
        Needs input{title ? ` · ${title}` : ""}
      </p>
      <div className="mt-3 [&>:first-child]:mt-0 [&_p]:mt-3 [&_p]:text-base [&_p]:leading-7 [&_p]:text-text-muted [&_ul]:mt-3 [&_ul]:text-base [&_ul]:leading-7 [&_ul]:text-text-muted">
        {children}
      </div>
    </aside>
  );
}

export const mdxComponents: MDXComponents = {
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  a: Anchor,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  strong: Strong,
  hr: Rule,
  code: InlineCode,
  pre: CodeBlock,
  NeedsInput,
};
