<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# styles

## Purpose
Global CSS and component/block styles. Tailwind v4 is configured via CSS (`global.css`) rather than a large JS config.

## Key Files
| File | Description |
|------|-------------|
| `global.css` | Tailwind import + theme: color tokens (`--color-global-bg`, `--color-global-text`, `--color-accent`, `--color-link`, `--color-muted`, `--color-special-*`), dark/light variants, base element styles, and the `cactus-link` / `title` utility classes. |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `blocks/` | `search.css` — Pagefind search UI styling. |
| `components/` | `admonition.css` and `github-card.css` — styles for the matching remark plugins. |

## For AI Agents

### Working In This Directory
- Use the defined color tokens (e.g. `text-muted`, `bg-global-bg`, `border-global-text/15`) for theme consistency rather than hardcoded colors — they adapt to dark/light mode.
- New markdown block plugins (in `src/plugins/`) should get their CSS here under `components/`.

## Dependencies

### External
- `tailwindcss` v4, `@tailwindcss/typography` (prose), `cssnano`, `autoprefixer`.

<!-- MANUAL: -->
