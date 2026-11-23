/**
 * What I'm focused on right now. The homepage highlights the first item only;
 * the full list lives on `/now`. Update `nowUpdated` whenever the list changes.
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

export const nowUpdated = "2026-11-23";

export const nowItems: NowItem[] = [
  {
    label: "Building",
    summary:
      "Home Inventory, a local-first app for keeping track of everything we own at home, starting with the Christmas decorations.",
    detail:
      "Three of eight milestones are done: owners, nested categories, items and groups, then tags and search. Photos are next, followed by custom attributes, storage locations, a dashboard and backups.",
    href: "/projects/home-inventory",
  },
  {
    label: "Finished",
    summary:
      "Glass Atlas, my ice cream catalog and tasting journal with weighted ratings, rankings and preference insights.",
    detail:
      "All seven milestones are done, so now it is mostly about using it, one scoop at a time.",
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
