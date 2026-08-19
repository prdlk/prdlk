<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# layout

## Purpose
Site-wide chrome rendered on every page by `src/layouts/Base.astro`.

## Key Files
| File | Description |
|------|-------------|
| `Header.astro` | Top nav: avatar logo, site title, `menuLinks` nav, search, theme toggle, mobile menu button. |
| `Footer.astro` | Three centered rows — nav links, social icon row (from `socialLinks`), copyright — with a top border. |

## For AI Agents

### Working In This Directory
- **Header logo positioning:** the avatar is `position: absolute` and overflows left into the page margin. It is centered on the **header** block (not just the title) — this only works because the logo's containing block is the `<header>` (which is `relative`). Do **not** put a `filter`/`transform`/`position: relative` on the wrapping `<a>`, or it becomes the containing block and the logo mis-centers. The grayscale/hover effect therefore lives on the `<img>`, not the `<a>`.
- Logo geometry was tuned against the header center; if you change the logo size (`sm:size-36`) or header padding (`sm:ps-28`), re-verify vertical centering and the left overflow (`sm:-start-[48px]`).
- `menuLinks` and `socialLinks` come from `src/site.config.ts` — edit there, not here.

### Testing Requirements
- Verify visually at desktop and mobile widths (the logo is inline on mobile, absolute/overflowing on `sm+`). Chrome DevTools MCP works for measuring element rects.

## Dependencies

### Internal
- `@/site.config` (`menuLinks`, `socialLinks`, `siteConfig`), `astro-icon` for social/RSS icons.

<!-- MANUAL: -->
