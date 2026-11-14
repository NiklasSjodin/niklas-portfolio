# Niklas — Portfolio

Personal website of Niklas Sjödin, built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Stack

- Next.js (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- ESLint
- Lucide icons
- npm

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the local development server   |
| `npm run build` | Create a production build            |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Project structure

- `src/app` — routes and root layout
- `src/components` — reusable UI (`Container`, `Button`, `Section`, navigation, note and project components)
- `src/content/notes` — Notes, one `.mdx` file per note
- `src/content/projects.ts` — project entries
- `src/content/now.ts` — the "Currently" list (homepage and `/now`) and the latest ice cream tasting
- `src/types/project.ts` — the `Project` model
- `src/lib` — shared constants (navigation, site), the notes/projects loaders, and the share-image renderer
- `src/app/opengraph-image.tsx`, `src/app/*/[slug]/opengraph-image.tsx` — link preview images
- `src/app/feed.xml`, `robots.ts`, `sitemap.ts` — RSS feed of published notes, robots and sitemap

## Drafts and samples

Starter-draft notes and sample projects show up while running `npm run dev`
and are left out of production builds, so the live site only shows finished
work. Their URLs return 404 in production. To preview a production build with
them, run `SHOW_DRAFTS=true npm run build`. The Notes link disappears from the
menu until at least one note is published.

No database, CMS, authentication, or backend API is included.

## Writing notes

Notes are MDX files in `src/content/notes/`. The file name is the URL slug
(lowercase kebab-case), so `my-note.mdx` is served at `/notes/my-note`. Each
file starts with YAML frontmatter:

```mdx
---
title: "Note title"
description: "One or two sentences, used on the listing page and in search/social previews."
date: "2026-11-06"          # YYYY-MM-DD
category: "Engineering"     # see below
tags: ["dotnet", "testing"]
status: "published"         # or "draft" (shows a "Starter draft" label and is not indexed)
relatedProjects: ["some-project"]   # optional, see below
---
```

Allowed categories: `Engineering`, `AI & Productivity`, `Smart Home &
Automation`, `Personal Thoughts`, `Technical implementation`. Invalid
frontmatter fails the build with a message naming the file.

Reading time is calculated automatically. In the body, use normal Markdown plus
fenced code blocks (add a language, e.g. ` ```csharp `). In starter drafts,
wrap sections that still need real content in `<NeedsInput title="...">`.

`relatedProjects` takes slugs from `src/content/projects.ts`. Slugs that are
not in that list are ignored, so a note never links to a project that does
not exist.

## Editing projects

Projects live in `src/content/projects.ts`, in display order. The `slug` is
the URL (`developer-assistant` is `/projects/developer-assistant`). Set
`sample` to `false` once an entry describes real work. Add `links.github` or
`links.demo` only when that URL exists; leave them out otherwise. Invalid
entries fail the build and name the slug.

A project page can have a write-up and screenshots:

- `sections`: `{ heading, body }` blocks; separate paragraphs in `body` with a blank line.
- `images`: `{ src, alt, width, height, caption? }`; put the files in
  `public/projects/<slug>/` and use `src: "/projects/<slug>/file.png"`.

## Now page and tasting

Edit `src/content/now.ts` and bump `nowUpdated` when the list changes. Set
`latestTasting` to a real Glass Atlas entry to show a "Latest tasting" card on
the homepage; it is hidden while `undefined`.

## Contact email

Set `siteContact.email` in `src/lib/site.ts` to show an email row on the
Contact page.
