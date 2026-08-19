<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# data

## Purpose
Thin query helpers over Content Collections — draft filtering, sorting, and the experience-taxonomy aggregation.

## Key Files
| File | Description |
|------|-------------|
| `post.ts` | `getAllPosts()` (returns `CollectionEntry<"writing">`, drafts filtered in prod) and `groupPostsByYear()`. **Naming quirk:** file/functions say "post" but operate on the `writing` collection. |
| `experience.ts` | `getAllExperience()` (sorted by `startDate` desc) and `getContentForExperience(id)` which gathers all `projects`/`writing`/`speaking` entries whose `experiences` include `id`. |
| `speaking.ts` | `getAllSpeaking()` (drafts filtered in prod). |

## For AI Agents

### Working In This Directory
- Draft filtering uses `import.meta.env.PROD ? !data.draft : true` — drafts are visible in dev, hidden in production.
- `getContentForExperience` matches refs via `entry.data.experiences.some((ref) => ref.id === id)`.

## Dependencies

### Internal
- `astro:content` (`getCollection`). Consumed by pages in `src/pages/` and the homepage.

<!-- MANUAL: -->
