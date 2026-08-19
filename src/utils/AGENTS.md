<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# utils

## Purpose
Pure, framework-agnostic helper functions used across components, pages, and data helpers.

## Key Files
| File | Description |
|------|-------------|
| `date.ts` | `getFormattedDate` (locale-aware, per `siteConfig.date`) and `collectionDateSort` — sorts `writing`/`projects`/`speaking`/etc. by `publishDate` descending. |
| `generateToc.ts` | Builds a nested table-of-contents tree from Astro markdown headings (used by `TOC.astro`). |
| `remark.ts` | Shared remark/markdown helpers. |
| `domElement.ts` | Small DOM helpers for client-side scripts. |
| `webmentions.ts` | Fetches and caches webmentions from webmention.io for the webmention components. |

## For AI Agents

### Working In This Directory
- `collectionDateSort` is typed for entries with a `publishDate`; experience entries (which use `startDate`/`endDate`) are sorted in `@/data/experience.ts` instead.
- Keep these pure and side-effect-free where possible; `webmentions.ts` is the exception (network + cache).

## Dependencies

### Internal
- `@/site.config` (date locale), `@/types`.

<!-- MANUAL: -->
