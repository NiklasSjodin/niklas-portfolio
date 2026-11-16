import { renderShareImage, shareImageSize } from "@/lib/share-image";
import { siteHeadline, siteName } from "@/lib/site";

export const alt = `Projects — ${siteName}, ${siteHeadline}`;
export const size = shareImageSize;
export const contentType = "image/png";

export default function ProjectsOpengraphImage() {
  return renderShareImage({
    eyebrow: "Projects",
    title: siteName,
    subtitle: "Side projects and what they are built with",
  });
}