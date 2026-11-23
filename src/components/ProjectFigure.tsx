import Image from "next/image";
import type { ProjectImage } from "@/types/project";

type ProjectFigureProps = {
  image: ProjectImage;
  /** Set on the first screenshot so it loads before the rest of the page. */
  priority?: boolean;
  className?: string;
};

/** A project screenshot with an optional caption. */
export function ProjectFigure({ image, priority = false, className = "" }: ProjectFigureProps) {
  return (
    <figure className={`m-0 ${className}`.trim()}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes="(min-width: 768px) 48rem, 100vw"
        className="h-auto w-full rounded-lg border border-border bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]"
      />
      {image.caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-text-muted">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
