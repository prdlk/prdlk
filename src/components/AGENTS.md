<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# components

## Purpose
Reusable `.astro` components for layout, content rendering, theming, search, and SEO.

## Key Files
| File | Description |
|------|-------------|
| `BaseHead.astro` | All `<head>` tags: title, meta, canonical, Open Graph/Twitter, favicons, RSS auto-discovery, webmentions. |
| `ExperienceTags.astro` | Renders linked chips for an entry's `experiences` refs; resolves them with `getEntries` and links to `/experience/<id>`. Used by Masthead, Project, and the speaking page. |
| `YouTube.astro` | Responsive YouTube embed (`youtube-nocookie.com/embed/<id>`). Used on speaking detail pages. No external player dependency. |
| `FormattedDate.astro` | `<time>` element formatted per `siteConfig.date`. |
| `Paginator.astro` | Prev/next pagination links. |
| `Search.astro` | Pagefind search UI (client-side, works only after build). |
| `ThemeProvider.astro` / `ThemeToggle.astro` | Dark/light mode state + toggle button. |
| `SkipLink.astro` | Accessibility skip-to-content link. |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `blog/` | Writing/post rendering: masthead, preview, table of contents, webmentions (see `blog/AGENTS.md`). |
| `layout/` | Site chrome: header + footer (see `layout/AGENTS.md`). |
| `project/` | Project rendering (see `project/AGENTS.md`). |

## For AI Agents

### Working In This Directory
- Components consume Content Collection types like `CollectionEntry<"writing">`; keep prop types in sync with `src/content.config.ts`.
- A CSS `filter` (e.g. `grayscale`) on an element makes it a containing block for absolutely-positioned children — this matters for the header logo (see `layout/AGENTS.md`).

### Common Patterns
- Polymorphic `as` prop (via `astro/types` `Polymorphic`) for heading-level control (e.g. `PostPreview`, `Project`).
- `data-pagefind-body` marks content for the search index.

## Dependencies

### External
- `astro-icon` for SVG icons — `lucide` for UI icons, `simple-icons` for brand/social logos (`@iconify-json/*` sets). Programming-language logos should use `devicon` (not yet installed — no consumer yet).

<!-- MANUAL: -->
