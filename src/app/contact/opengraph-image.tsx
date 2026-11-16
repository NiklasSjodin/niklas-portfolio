import { renderShareImage, shareImageSize } from "@/lib/share-image";
import { siteHeadline, siteName } from "@/lib/site";

export const alt = `${siteName} — Backend engineer · .NET & integrations`;
export const size = shareImageSize;
export const contentType = "image/png";

export default function ContactOpengraphImage() {
  return renderShareImage({
    eyebrow: "Contact",
    title: "Get in touch",
    subtitle: siteName,
  });
}