# Niklas — Portfolio

Personal developer portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS.

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
- `src/components` — reusable UI (`Container`, `Button`, `Section`, navigation, note components)
- `src/content/notes` — Notes, one `.mdx` file per note
- `src/lib` — shared constants (navigation, site) and the notes/projects loaders

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

`relatedProjects` takes project slugs from `src/lib/projects.ts`. Slugs that are
not in that registry are ignored, so a note never links to a project that does
not exist. The registry is empty until the Projects page has real content.
