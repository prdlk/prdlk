<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# src

## Purpose
All application source: configuration, content collections, pages/routes, layouts, components, data helpers, styles, and build plugins.

## Key Files
| File | Description |
|------|-------------|
| `site.config.ts` | Site metadata (`siteConfig`), `socialLinks`, `menuLinks`, and Expressive Code options. Primary place to edit site-wide settings. |
| `content.config.ts` | Content Collection definitions + Zod schemas for `writing`, `projects`, `experience`, `speaking`. Experience refs are validated via `reference("experience")`. |
| `types.ts` | Shared TS types (`SiteConfig`, `SiteMeta`, webmention types, `AdmonitionType`). |
| `env.d.ts` | Ambient type declarations. |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `assets/` | Build-time assets, currently OG fonts (see `assets/AGENTS.md`). |
| `components/` | Reusable `.astro` components (see `components/AGENTS.md`). |
| `content/` | Markdown content for the four collections (see `content/AGENTS.md`). |
| `data/` | Collection query helpers (see `data/AGENTS.md`). |
| `layouts/` | Page shells (see `layouts/AGENTS.md`). |
| `pages/` | File-based routes + endpoints. **No `AGENTS.md` here** — any `.md` under `src/pages` becomes a public route, so docs for this dir live in this file (see "Routing & OG images" below). |
| `plugins/` | Custom remark plugins (see `plugins/AGENTS.md`). |
| `styles/` | Global CSS + block/component styles (see `styles/AGENTS.md`). |
| `utils/` | Pure helper functions (see `utils/AGENTS.md`). |

## For AI Agents

### Working In This Directory
- Collection **keys match their content dir and route**: `writing`→`/writing`, `projects`→`/projects`, `experience`→`/experience`, `speaking`→`/speaking`.
- When changing a collection schema in `content.config.ts`, run `pnpm build` to regenerate `astro:content` types and catch frontmatter mismatches.

### Routing & OG images (`src/pages`)
- Any `.md`/`.mdx`/`.astro` under `src/pages` becomes a route — do **not** put `AGENTS.md` or other docs there (they'd ship as public pages). Document `pages/` here instead.
- Each section has `[...page].astro` (paginated list) + `[...slug].astro` (detail); plus `rss.xml.ts` feeds and a dynamic OG-image endpoint.
- `og-image/[...slug].png.ts` generates per-entry social images for **all** collections (namespaced `/og-image/<type>/<id>.png`) via Satori + Sharp, cached by `_cacheUtil.ts` (bump `CACHE_VERSION` when changing `_ogMarkup.ts`). Files prefixed `_` are private modules, not routes.
- The `/experience/[...slug]` page is the taxonomy hub (`getContentForExperience`), listing related projects/writing/talks.

### Common Patterns
- The `experiences` frontmatter array (on projects/writing/speaking) holds `reference("experience")` entries, resolved with `getEntries`.

## Dependencies

### Internal
- Nearly everything imports `@/site.config` and `@/content.config`-derived collection types.

<!-- MANUAL: -->
