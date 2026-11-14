import { getNoteBySlug, getNoteSlugs } from "@/lib/notes";
import { renderShareImage, shareImageSize } from "@/lib/share-image";
import { siteName } from "@/lib/site";

export const alt = `A note by ${siteName}`;
export const size = shareImageSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getNoteSlugs()).map((slug) => ({ slug }));
}

export default async function NoteImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  return renderShareImage({
    eyebrow: `Note · ${siteName}`,
    title: note?.title ?? siteName,
  });
}
