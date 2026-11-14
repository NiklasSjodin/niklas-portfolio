/**
 * Whether unfinished content (starter-draft notes and sample projects) is
 * shown. It is visible while developing locally and hidden from the live site.
 * Set `SHOW_DRAFTS=true` to preview it in a production build.
 */
export const showUnfinished =
  process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "true";
