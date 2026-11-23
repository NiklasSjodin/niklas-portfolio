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
      "My ice cream catalog and tasting journal: weighted ratings, rankings, price history and preference insights, running on a .NET 10 API and PostgreSQL at home.",
    description:
      "A private, single-user app for cataloguing ice cream and keeping a tasting journal. Every scoop gets a weighted score, and the dashboard turns the journal into rankings, price history and preference insights. Next.js on the front, ASP.NET Core on .NET 10 behind it, PostgreSQL underneath.",
    status: "in-progress",
    sample: false,
    tags: ["nextjs", "dotnet", "postgresql", "full-stack", "testing"],
    images: [
      {
          src: "/projects/glass-atlas/dashboard.jpg",
          alt: "The Glass Atlas dashboard: totals for ice creams, tastings, average rating, brands, favorites and wishlist, above top-rated and recently tasted lists.",
          width: 2560,
          height: 2480,
          caption: "The dashboard. All screenshots use demo data, not my real tasting journal.",
        },
    ],
    sections: [
      {
        heading: "What it does",
        body: "Glass Atlas keeps a catalog of ice creams and a journal of every time I have one: the date, what I paid and where, notes, and up to five ratings. The catalog can be searched, filtered by brand, category and flavor or attribute tags, and sorted. Favorites and a wishlist sit alongside it.\n\nIt is a single-user app on purpose. It is built for one very dedicated taster, which keeps the scope small enough to make every part of it feel finished.",
        image: {
          src: "/projects/glass-atlas/catalog.jpg",
          alt: "The Glass Atlas catalog: a grid of ice cream cards with brand, tags, category, number of tastings and average score.",
          width: 2560,
          height: 1960,
        },
      },
      {
        heading: "A score worth trusting",
        body: "Each tasting can rate taste, texture, sweetness, appearance and value from 1 to 10 in half points, all optional. The overall score is a weighted average of the qualities actually rated: taste 35%, texture 25%, sweetness 15%, appearance 10% and value 15%, with the weights rescaled when something is left out. The same formula runs in C# and inside PostgreSQL, and a shared test fixture checks that both give identical results.\n\nThe product page also tracks what I paid over time, and \u201cTaste again\u201d starts a new tasting prefilled from the last one.",
        image: {
          src: "/projects/glass-atlas/product.jpg",
          alt: "A Glass Atlas product page: the product photo, flavor tags and actions, above a price history with lowest, latest and average price and a line chart.",
          width: 2560,
          height: 2000,
        },
      },
      {
        heading: "Rankings and insights",
        body: "Six leaderboards (best rated, best taste, best texture, best value, most tasted and lowest rated) can be filtered by category, brand and tags, and the whole view lives in the URL. An ice cream needs at least two rated tastings to be ranked on a rating, so one lucky scoop can\u2019t top the chart.\n\nThe dashboard adds preference insights: how I rate each flavor, attributes such as vegan compared with everything else, taste against texture, brands and stores. Each insight shows its sample size and says \u201cNot enough data yet\u201d rather than guessing.",
        image: {
          src: "/projects/glass-atlas/rankings.jpg",
          alt: "The Glass Atlas rankings page: leaderboard tabs and filters above a ranked list of ice creams with their average scores.",
          width: 2560,
          height: 2240,
        },
      },
      {
        heading: "How it is built",
        body: "The frontend is a Next.js App Router app with TypeScript, Tailwind CSS, React Hook Form, Zod and Recharts. Behind it sits an ASP.NET Core Web API on .NET 10 with EF Core and PostgreSQL 16 in Docker Compose. The backend has over 240 xUnit tests, with integration tests running against real PostgreSQL through Testcontainers, and the frontend has around 250 Vitest tests.",
      },
      {
        heading: "Running it at home",
        body: "Glass Atlas runs on my own computer, not in the cloud. One script starts or stops everything, and another reports what is running. Backups are a single ZIP with a database dump, every photo and a checksummed manifest, and a restore goes through a scratch database with an automatic safety backup and rollback, all covered by a round-trip test. With LAN mode switched on, I can log a tasting from my phone at home.",
      },
      {
        heading: "Where it stands",
        body: "Seven milestones are done, from the foundation to quick-add tastings, tags and preference insights. Next on the list are a backup reminder in the app and smaller refinements. The code is private for now.",
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
