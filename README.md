<!--toc:start-->
- [What this is](#what-this-is)
  - [Experience as a taxonomy](#experience-as-a-taxonomy)
- [Tech](#tech)
- [Commands](#commands)
- [Content](#content)
  - [Projects (`src/content/projects`)](#projects-srccontentprojects)
  - [Experience (`src/content/experience`)](#experience-srccontentexperience)
  - [Writing (`src/content/writing`)](#writing-srccontentwriting)
  - [Speaking (`src/content/speaking`)](#speaking-srccontentspeaking)
- [Configure](#configure)
- [Deploy](#deploy)
- [Acknowledgment](#acknowledgment)
- [License](#license)
<!--toc:end-->

<div align="center">
  <img alt="Prad Nukala" src="./public/avatar.png" width="96" />
</div>
<h1 align="center">pradnukala.com</h1>

<p align="center">The personal CV &amp; portfolio site of <strong>Prad Nukala</strong> — engineer and founder.</p>

## What this is

This repo is my personal website at [www.pradnukala.com](https://www.pradnukala.com) (prad.nu redirects here). It's a static [Astro](https://astro.build) site (originally forked from the [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) theme) reworked into a portfolio organised around four sections:

| Section            | Route          | Purpose                                                      |
| ------------------ | -------------- | ------------------------------------------------------------ |
| **Projects**       | `/projects`    | Things I've built, with links to live sites and source.      |
| **Experience**     | `/experience`  | Resume-style roles, which also act as a taxonomy (see below). |
| **Writing**        | `/writing`     | Essays, notes, and articles.                                 |
| **Speaking**       | `/speaking`    | Talks, with an embedded YouTube player. |

### Experience as a taxonomy

Experience entries are the connective tissue of the site. Projects, writing, and talks each declare an `experiences` array in their frontmatter that references experience entries by id. Each experience page then renders its own write-up **plus** every project, post, and talk filed under it — so the content cross-links automatically.

## Tech

- [Astro](https://astro.build) v6 (static output, no adapter required)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Content Collections](https://docs.astro.build/en/guides/content-collections/) with type-checked frontmatter (`src/content.config.ts`)
- Embedded YouTube players for speaking videos
- [Satori](https://github.com/vercel/satori) OG images, [Pagefind](https://pagefind.app/) search, RSS, sitemap, and `Person` JSON-LD on the homepage for SEO
- Dark / light mode, accessible semantic markup

## Commands

| Command          | Action                                              |
| :--------------- | :-------------------------------------------------- |
| `pnpm install`   | Install dependencies                                |
| `pnpm dev`       | Start the local dev server                          |
| `pnpm build`     | Build the production site to `./dist/`              |
| `pnpm postbuild` | Build the Pagefind static search index             |
| `pnpm preview`   | Preview the production build locally                |
| `pnpm sync`      | Generate types from the content config             |

## Content

Content lives in `src/content/<collection>` as `.md`/`.mdx` files; the filename becomes the slug. The schema for each collection is defined in `src/content.config.ts`.

### Projects (`src/content/projects`)

| Property        | Required | Notes                                              |
| --------------- | :------: | -------------------------------------------------- |
| `title`         |    ✓     | Max 60 chars.                                      |
| `startDate`     |    ✓     | Date.                                              |
| `endDate`       |          | Omit for ongoing projects. Projects are sorted by `endDate`, most recent first (ongoing on top). |
| `description`   |          | Used for meta description.                         |
| `link`          |          | URL to the live project.                           |
| `repo`          |          | URL to the source repository.                      |
| `tags`          |          | Skills/technologies — double as tags for cross-project browsing at `/projects/tags/<tag>`. |
| `experiences`   |          | Array of experience ids this project is filed under. |

### Experience (`src/content/experience`)

| Property        | Required | Notes                                              |
| --------------- | :------: | -------------------------------------------------- |
| `title`         |    ✓     | Display name of the experience (also its id via filename). |
| `organization`  |    ✓     | Company / org.                                     |
| `startDate`     |    ✓     | Date.                                              |
| `endDate`       |          | Omit for current/ongoing.                          |
| `role`          |          | Job title.                                         |
| `location`      |          | e.g. "Remote".                                     |
| `url`           |          | Org website.                                       |
| `description`   |          | Short summary.                                     |

### Writing (`src/content/writing`)

| Property        | Required | Notes                                              |
| --------------- | :------: | -------------------------------------------------- |
| `title`         |    ✓     | Max 60 chars.                                      |
| `description`   |    ✓     | Meta description.                                  |
| `publishDate`   |    ✓     | Date.                                              |
| `updatedDate`   |          | Date.                                              |
| `coverImage`    |          | `{ src, alt }`.                                    |
| `ogImage`       |          | Skip Satori generation with a custom OG image.     |
| `tags`          |          | String array.                                      |
| `experiences`   |          | Array of experience ids.                           |
| `externalUrl`   |          | If set, the entry links out to this URL (an article published on Fast Company, Medium, LinkedIn, …) instead of rendering a local page. |
| `publisher`     |          | Publisher name shown as a badge next to external entries (e.g. "Fast Company"). |
| `draft`         |          | `true` excludes the post from production builds.   |
| `pinned`        |          | Pin to the top of `/writing`.                      |

To surface an article published elsewhere (PESOS), add a stub with no body:

```md
---
title: "Why user-owned identity matters"
description: "A short summary of the piece."
publishDate: "2025-01-15"
externalUrl: "https://www.fastcompany.com/…"
publisher: "Fast Company"
tags: ["identity"]
---
```

It appears in `/writing`, RSS, and the `/skills` taxonomy, links straight to the publisher (new tab, with a `↗ Publisher` badge), and gets no local detail page — so there's no duplicate-content risk.

### Speaking (`src/content/speaking`)

| Property         | Required | Notes                                             |
| ---------------- | :------: | ------------------------------------------------- |
| `title`          |    ✓     | Max 60 chars.                                      |
| `description`    |    ✓     | Meta description.                                  |
| `publishDate`    |    ✓     | Date.                                              |
| `youtubeId`      |    ✓     | YouTube video ID (the `v=` value).                 |
| `event`          |          | Conference / event name.                           |
| `tags`           |          | String array.                                      |
| `experiences`    |          | Array of experience ids.                           |
| `draft`          |          | `true` excludes the talk from production builds.    |

## Configure

Most site-wide settings live in **`src/site.config.ts`**:

- `siteConfig` — title, author, description, `url` (used for canonical URLs and OG tags), locale.
- `socialLinks` — GitHub / X / LinkedIn / Medium / Discord / Telegram / email, shown in the footer and homepage intro.
- `menuLinks` — header/footer navigation.

Replace `public/avatar.png` (header logo) and `public/social-card.png` (default OG image) with your own.

## Deploy

Static output, so it builds to `./dist/` with no adapter. See the [Astro deploy guides](https://docs.astro.build/en/guides/deploy/). For Cloudflare Workers, point the assets directory at `./dist` with a static [Wrangler config](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/).

## Acknowledgment

Built on the [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) theme by Chris Williams.

## License

MIT
