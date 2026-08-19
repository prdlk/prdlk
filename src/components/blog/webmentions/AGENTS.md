<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# webmentions

## Purpose
Display [webmentions](https://webmention.io/) (likes and comments) fetched for a post.

## Key Files
| File | Description |
|------|-------------|
| `index.astro` | Entry component; gates rendering on the `WEBMENTION_URL` env var and fetches mentions. |
| `Likes.astro` | Renders "like" webmentions. |
| `Comments.astro` | Renders comment/reply webmentions. |

## For AI Agents

### Working In This Directory
- Webmentions are optional and only active when the `WEBMENTION_*` client env vars are set (see `astro:env/client` usage in `BaseHead.astro`). Fetch/caching logic lives in `@/utils/webmentions.ts`.

## Dependencies

### Internal
- `@/utils/webmentions.ts`, `@/types` (webmention types).

<!-- MANUAL: -->
