import type { Project } from "@/types/project";

/**
 * Portfolio projects, in the order they appear on `/projects`.
 *
 * To replace a sample: edit the fields, set `sample` to false, delete
 * `outline`, and add `links` only when a real repository or demo exists.
 * Samples are only shown locally; production builds leave them out.
 * Screenshots go in `public/projects/<slug>/` and are listed in `images`.
 * Notes can reference a project by putting its slug in `relatedProjects`.
 * Unknown slugs are ignored.
 */
export const projects: readonly Project[] = [
  {
    slug: "glass-atlas",
    title: "Glass Atlas",
    summary:
      "Personal ice cream catalog and tasting journal with weighted ratings, built as a polished product rather than a generic CRUD demo.",
    description:
      "A private, single-user app for cataloguing ice cream and keeping a tasting journal with weighted ratings. Next.js on the front, ASP.NET Core on .NET 10 behind it, PostgreSQL underneath.",
    status: "in-progress",
    sample: false,
    tags: ["nextjs", "dotnet", "postgresql", "full-stack"],
    sections: [
      {
        heading: "What it does",
        body: "Glass Atlas tracks ice cream products and the tasting sessions around them: when, what, and notes on how it went. Each tasting can be scored across taste, texture, sweetness, appearance and value, and the catalog can be searched and filtered.\n\nIt is a single-user app on purpose. It is built for one very dedicated taster, which keeps the scope small enough to make every part of it feel finished.",
      },
      {
        heading: "How it is built",
        body: "The frontend is a Next.js App Router app. Behind it sits an ASP.NET Core Web API on .NET 10, with PostgreSQL running through Docker Compose. Both sides have automated tests.",
      },
      {
        heading: "Where it stands",
        body: "The foundation, the product catalog and the tasting journal work end to end. Next up are a dashboard, rankings and deployment. The code is private while it is in active development.",
      },
    ],
  },
  {
    slug: "smart-home-automation",
    title: "Smart Home Automation",
    summary:
      "Sample entry. A project exploring practical home automation and integrations, still to be written up.",
    description:
      "Sample outline for Smart Home Automation, a project exploring practical home automation and integrations. The real setup and results are not written yet.",
    status: "experiment",
    sample: true,
    tags: ["home-assistant", "automation"],
    outline: [
      "What is being explored, and what should stay manual.",
      "What actually runs today, if anything.",
      "Devices, protocols and where it is hosted.",
      "What changed after using it for a while.",
    ],
  },
];
