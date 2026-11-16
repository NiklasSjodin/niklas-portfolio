import { renderShareImage, shareImageSize } from "@/lib/share-image";
import { siteHeadline, siteName } from "@/lib/site";

export const alt = `About ${siteName} — ${siteHeadline}`;
export const size = shareImageSize;
export const contentType = "image/png";

export default function AboutOpengraphImage() {
  return renderShareImage({
    eyebrow: "About",
    title: siteName,
    subtitle: siteHeadline,
  });
}