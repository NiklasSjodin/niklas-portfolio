import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const shareImageSize = { width: 1200, height: 630 };

// Read synchronously so the images are prerendered at build time.
const serif = readFileSync(
  path.join(process.cwd(), "src/assets/InstrumentSerif-Regular.ttf"),
);
const portrait = `data:image/jpeg;base64,${readFileSync(
  path.join(process.cwd(), "public/niklas.jpg"),
).toString("base64")}`;

type ShareImageProps = {
  /** Small label above the title, e.g. "Project". */
  eyebrow: string;
  title: string;
  subtitle?: string;
};

/**
 * The 1200×630 preview shown when a link to the site is shared, in the site's
 * colours and serif, with the portrait on the right.
 */
export function renderShareImage({ eyebrow, title, subtitle }: ShareImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 64,
          padding: "0 96px",
          background:
            "radial-gradient(circle at 30% 0%, #2a3530 0%, #151a18 60%)",
          color: "#f0eee7",
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 6,
              color: "#78917d",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 28 ? 80 : 104,
              lineHeight: 1.05,
              marginTop: 24,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 44, color: "#d8c6a0", marginTop: 24 }}>
              {subtitle}
            </div>
          ) : null}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
        <img
          src={portrait}
          alt=""
          width={280}
          height={280}
          style={{
            borderRadius: 9999,
            objectFit: "cover",
            border: "2px solid rgba(120, 145, 125, 0.45)",
          }}
        />
      </div>
    ),
    {
      ...shareImageSize,
      fonts: [{ name: "Instrument Serif", data: serif, weight: 400 }],
    },
  );
}
