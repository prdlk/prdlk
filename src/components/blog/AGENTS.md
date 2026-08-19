<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# blog

## Purpose
Components for rendering Writing (the `writing` collection) — post mastheads, list previews, table of contents, and webmentions. (Folder is named `blog` for historical reasons; it serves the `/writing` section.)

## Key Files
| File | Description |
|------|-------------|
| `Masthead.astro` | Post header: cover image, title, date, reading time, updated badge, and `ExperienceTags` (linked experience chips — replaces the old tag links). |
| `PostPreview.astro` | One-line writing entry (date + linked title) used in lists; links to `/writing/<id>`. |
| `TOC.astro` / `TOCHeading.astro` | Table of contents built from rendered headings. |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `webmentions/` | Webmention display components (see `webmentions/AGENTS.md`). |

## For AI Agents

### Working In This Directory
- These consume `CollectionEntry<"writing">`.
- `Masthead` renders `data.experiences` via `ExperienceTags`; it no longer links freeform `tags` to a `/tags` route (that route was removed).

## Dependencies

### Internal
- `@/components/ExperienceTags.astro`, `@/components/FormattedDate.astro`, `@/utils/generateToc`.

<!-- MANUAL: -->
