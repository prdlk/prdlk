<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# public

## Purpose
Static assets copied verbatim to the site root at build time (served at `/`).

## Key Files
| File | Description |
|------|-------------|
| `avatar.png` | Personal avatar used as the header logo (`src/components/layout/Header.astro`, referenced as `/avatar.png`) and in the homepage `Person` JSON-LD. |
| `icon.svg` | Source icon; `astro-webmanifest` generates favicons / apple-touch / manifest icons from it at build (referenced in `BaseHead.astro`). |
| `social-card.png` | Default Open Graph image when a page/post supplies no `ogImage`. |

## For AI Agents

### Working In This Directory
- Reference these with absolute root paths (`/avatar.png`), not the `@/` alias — they are not processed by Astro's asset pipeline.
- Replacing `icon.svg` changes all generated favicons/manifest icons; keep it roughly square (build warns otherwise).

<!-- MANUAL: -->
