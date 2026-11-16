import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { renderShareImage, shareImageSize } from "@/lib/share-image";
import { siteName } from "@/lib/site";

export const size = shareImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "Project";

  return renderShareImage({
    eyebrow: `Project · ${siteName}`,
    title,
    subtitle: project?.summary,
  });
}