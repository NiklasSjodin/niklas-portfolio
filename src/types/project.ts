/** Statuses a project may use. Samples should be `experiment` or `in-progress`. */
export const projectStatuses = ["experiment", "in-progress", "completed"] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

export const projectStatusLabels: Record<ProjectStatus, string> = {
  experiment: "Experiment",
  "in-progress": "In progress",
  completed: "Completed",
};

/** Optional external links. Omit a field, or the whole object, when it does not exist. */
export type ProjectLinks = {
  github?: string;
  demo?: string;
};

export type Project = {
  /** URL slug. Lowercase kebab-case. Served at `/projects/[slug]`. */
  slug: string;
  title: string;
  /** Short line for cards and related-project rows. */
  summary: string;
  /** Unique description for the detail page and for search/social previews. */
  description: string;
  status: ProjectStatus;
  tags: string[];
  /**
   * Prompts for sections that still need real content. Rendered as a
   * "still to write" list. Remove once the write-up is real.
   */
  outline?: string[];
  /**
   * `true` marks a placeholder entry: it shows a Sample label and is kept
   * out of search results. Set to `false` when the entry describes real work.
   */
  sample: boolean;
  links?: ProjectLinks;
};
