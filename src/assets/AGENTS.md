<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# assets

## Purpose
Build-time assets imported by source code (processed by Astro/Vite), as opposed to `public/` which is served verbatim.

## Key Files
| File | Description |
|------|-------------|
| `roboto-mono-regular.ttf` | Font (weight 400) embedded into Satori-generated OG images. |
| `roboto-mono-700.ttf` | Font (weight 700) for OG image titles. |

## For AI Agents

### Working In This Directory
- These fonts are imported as raw buffers in `src/pages/og-image/[...slug].png.ts` (via the `vite-plugin-raw-fonts` config in `astro.config.ts`). Renaming requires updating that import.

## Dependencies

### Internal
- `src/pages/og-image/` — consumes these fonts.

<!-- MANUAL: -->
