<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# content

## Purpose
Markdown/MDX content for the four collections. Each subdirectory is a collection; the filename is the entry id/slug. Schemas live in `src/content.config.ts`.

## Subdirectories
| Directory | Collection key | Route | Notes |
|-----------|----------------|-------|-------|
| `projects/` | `projects` | `/projects` | Things built. Fields: `title`, `startDate`, `endDate?` (omit = ongoing), `description?`, `link?`, `repo?`, `tags?` (skills; browsable site-wide at `/skills/<skill>`), `experiences?`. Sorted by `endDate` desc, ongoing first. |
| `writing/` | `writing` | `/writing` | Posts. Fields incl. `description`, `coverImage?`, `ogImage?`, `tags?`, `experiences?`, `draft`, `pinned`, `externalUrl?`/`publisher?` (PESOS — entry links out to the publisher, no local detail page). |
| `experience/` | `experience` | `/experience` | Resume entries + taxonomy. Fields: `title`, `organization`, `startDate`, `endDate?`, `role?`, `location?`, `url?`, `description?`. |
| `speaking/` | `speaking` | `/speaking` | Talks. Fields: `title`, `description`, `publishDate`, `youtubeId` (YouTube video ID), `event?`, `tags?`, `experiences?`, `draft`. |

## For AI Agents

### Working In This Directory
- **Experience taxonomy:** entries in `projects`, `writing`, and `speaking` reference experiences via an `experiences: [<id>]` array (validated by `reference("experience")`). The id is the experience filename without extension (e.g. `experiences: ["sonr"]` → `experience/sonr.md`). Adding a ref to a non-existent experience fails the build.
- `draft: true` (writing/speaking) hides an entry from production builds.
- After editing frontmatter, `pnpm build` validates it against the schema.

### Common Patterns
- Some `writing/` samples (`markdown-elements`, `testing/`) are leftover theme demos showcasing markdown rendering — safe to delete once real content exists.

<!-- MANUAL: -->
