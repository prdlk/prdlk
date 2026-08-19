<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# plugins

## Purpose
Custom remark plugins wired into Astro's markdown pipeline (`astro.config.ts` → `markdown.remarkPlugins`).

## Key Files
| File | Description |
|------|-------------|
| `remark-admonitions.ts` | Turns `:::tip`/`:::note`/`:::important`/`:::caution`/`:::warning` directives into styled admonition blocks. Types defined in `@/types` (`AdmonitionType`); styled by `src/styles/components/admonition.css`. |
| `remark-github-card.ts` | Renders a GitHub repo card from a directive. Styled by `src/styles/components/github-card.css`. |
| `remark-reading-time.ts` | Computes reading time (via `reading-time`) and injects it into frontmatter; surfaced as `remarkPluginFrontmatter.readingTime` in `BlogPost.astro`. |

## For AI Agents

### Working In This Directory
- These use the unified/mdast ecosystem (`unist-util-visit`, `mdast-util-directive`, `hastscript`). Directive syntax requires `remark-directive` (already configured).
- Adding/removing a plugin requires editing `astro.config.ts`. Add matching CSS under `src/styles/components/` for any new block type.

## Dependencies

### External
- `unified`, `unist-util-visit`, `mdast-util-directive`, `mdast-util-to-string`, `hastscript`, `reading-time`.

<!-- MANUAL: -->
