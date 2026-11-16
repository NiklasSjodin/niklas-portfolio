import { renderShareImage, shareImageSize } from "@/lib/share-image";
import { siteHeroLine, siteName } from "@/lib/site";

export const alt = `${siteName} — ${siteHeroLine}`;
export const size = shareImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderShareImage({
    eyebrow: "niklasjodin.se",
    title: siteName,
    subtitle: siteHeroLine,
  });
}
