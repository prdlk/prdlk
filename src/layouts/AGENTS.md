<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# layouts

## Purpose
Page shells that wrap route content with `<head>`, header, footer, and theming.

## Key Files
| File | Description |
|------|-------------|
| `Base.astro` | Root shell for all pages. Renders `BaseHead`, `ThemeProvider`, `Header`, `<main class="mb-20">`, `Footer`, and prefetch speculation rules. Takes a `meta: SiteMeta` prop; `description` defaults to `siteConfig.description`. Sets `max-w-3xl`, `font-mono`, padding. |
| `BlogPost.astro` | Layout for individual writing entries. Renders `Masthead`, optional `TOC`, the prose body, webmentions, and a back-to-top button. Builds the OG image URL as `/og-image/${post.id}.png`. |

## For AI Agents

### Working In This Directory
- Every page should render inside `Base.astro` (directly or via `BlogPost.astro`) and pass a `meta` object (`title` required; `description`, `ogImage`, `articleDate` optional).
- `<main>` carries `mb-20` to separate content from the footer's top border — adjust here for global content/footer spacing.

## Dependencies

### Internal
- `@/components/BaseHead.astro`, `@/components/layout/*`, `@/components/blog/*`, `@/site.config`, `@/types`.

<!-- MANUAL: -->
