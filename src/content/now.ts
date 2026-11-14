/**
 * What I'm focused on right now. Shown as "Currently" on the homepage and in
 * full on `/now`. Update `updated` whenever the list changes.
 */

export type NowItem = {
  /** One word, shown as a small label, e.g. "Building". */
  label: string;
  /** One sentence for the homepage. */
  summary: string;
  /** Optional extra detail, shown only on `/now`. */
  detail?: string;
  /** Optional internal link, e.g. "/projects/glass-atlas". */
  href?: string;
};

/**
 * The most recent ice cream tasting, shown on the homepage when set.
 * Leave it `undefined` until there is a real entry from Glass Atlas.
 */
export type Tasting = {
  product: string;
  brand?: string;
  /** Overall score out of `outOf`. */
  score: number;
  outOf: number;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  /** A short tasting note, in quotes on the page. */
  note?: string;
};

export const nowUpdated = "2026-11-14";

export const nowItems: NowItem[] = [
  {
    label: "Building",
    summary:
      "Glass Atlas, a catalog and tasting journal for ice cream with weighted ratings.",
    detail:
      "The catalog and the tasting journal work end to end. Next up are a dashboard, rankings and getting it deployed.",
    href: "/projects/glass-atlas",
  },
  {
    label: "Tinkering",
    summary:
      "Home Assistant, and finding clever ways to connect everyday devices at home.",
  },
  {
    label: "Training",
    summary:
      "Strength training, working towards getting a little stronger and more consistent.",
  },
];

export const latestTasting: Tasting | undefined = undefined;
