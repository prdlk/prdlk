<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# prad.nu

## Purpose
Personal CV / portfolio site for Prad Nukala (https://prad.nu). A static [Astro](https://astro.build) v6 site (forked from the Astro Cactus theme) organised into four content sections — **Projects**, **Experience**, **Writing**, **Speaking** — where Experience entries double as a cross-linking taxonomy. See `README.md` for the human-facing overview.

## Key Files
| File | Description |
|------|-------------|
| `package.json` | Dependencies and scripts (bun). |
| `astro.config.ts` | Astro integrations (MDX, sitemap, icon, robots, webmanifest, expressive-code), markdown remark/rehype pipeline, Satori OG fonts. |
| `tailwind.config.ts` | Tailwind v4 config (most styling is in `src/styles/global.css`). |
| `tsconfig.json` | TypeScript config; defines the `@/*` → `src/*` path alias. |
| `biome.json` | Biome linter/formatter config (`bun run check` / `bun run lint`). |
| `README.md` | Project purpose, content model, frontmatter reference. |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `src/` | All application source (see `src/AGENTS.md`). |
| `public/` | Static assets served as-is (see `public/AGENTS.md`). |

## For AI Agents

### Working In This Directory
- Package manager is **bun**. Output is **static** (`output: 'static'`, `./dist`) — no SSR adapter.
- Import from source via the `@/` alias (e.g. `@/site.config`), not long relative paths.
- Most site-wide config (title, url, `socialLinks`, `streamOrigin`, `menuLinks`) lives in `src/site.config.ts`.

### Testing Requirements
- `bun run build` is the primary correctness gate — it runs `astro check`-level content validation and fails on bad frontmatter, broken collection refs, or type errors.
- `bun run check` runs `astro check` + Biome. `bun run dev` serves locally for visual checks.

### Common Patterns
- Content lives in Content Collections; schema is defined once in `src/content.config.ts`.
- `is:inline` is required on `<script type="application/ld+json">` and similar non-bundled scripts.

## Dependencies

### External
- `astro` v6, `tailwindcss` v4 — framework + styling.
- `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`, `astro-icon`, `astro-webmanifest`, `astro-robots-txt`, `astro-expressive-code`.
- `satori` + `sharp` — OG image generation. `pagefind` — static search. `@mux`? no — speaking uses Cloudflare Stream via an iframe (no player dep).

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
