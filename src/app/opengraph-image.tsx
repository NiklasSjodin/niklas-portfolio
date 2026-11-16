import { renderShareImage, shareImageSize } from "@/lib/share-image";
import { siteHeadline, siteName, siteTagline } from "@/lib/site";

export const alt = `${siteName} — ${siteHeadline}`;
export const size = shareImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderShareImage({
    eyebrow: "niklasjodin.se",
    title: siteName,
    subtitle: `${siteHeadline} · ${siteTagline}`,
  });
}
