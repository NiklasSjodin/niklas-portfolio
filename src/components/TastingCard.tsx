import { IceCreamCone } from "lucide-react";
import type { Tasting } from "@/content/now";
import { formatNoteDate } from "@/lib/note-model";

/** The latest entry from the Glass Atlas tasting journal. */
export function TastingCard({ tasting }: { tasting: Tasting }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-7 sm:p-9">
      <p className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-accent uppercase">
        <IceCreamCone aria-hidden size={14} />
        Latest tasting
      </p>
      <h3 className="mt-4 font-display text-3xl tracking-tight text-text text-balance">
        {tasting.product}
      </h3>
      {tasting.brand ? (
        <p className="mt-1 text-text-muted">{tasting.brand}</p>
      ) : null}
      {tasting.note ? (
        <p className="mt-5 font-display text-xl text-champagne">
          “{tasting.note}”
        </p>
      ) : null}
      <p className="mt-auto flex items-baseline gap-3 pt-6 font-mono text-xs text-text-muted">
        <span className="font-display text-3xl text-text">
          {tasting.score}
          <span className="text-lg text-text-muted">/{tasting.outOf}</span>
        </span>
        {formatNoteDate(tasting.date)}
      </p>
    </article>
  );
}
