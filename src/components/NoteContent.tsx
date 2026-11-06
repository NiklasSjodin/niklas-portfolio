import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

type NoteContentProps = {
  /** MDX source without frontmatter. Always local, trusted content. */
  source: string;
};

export function NoteContent({ source }: NoteContentProps) {
  return (
    <div className="[&>:first-child]:mt-0">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
