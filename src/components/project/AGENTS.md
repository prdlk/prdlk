<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-30 | Updated: 2026-06-30 -->

# project

## Purpose
Rendering for the `projects` collection.

## Key Files
| File | Description |
|------|-------------|
| `Project.astro` | Polymorphic component for a project. In `isPreview` mode it renders a compact card linking to `/projects/<id>`; in full mode it shows the title, date, `link`/`repo` buttons, rendered body, and `ExperienceTags`. |

## For AI Agents

### Working In This Directory
- Prop is `project: CollectionEntry<"projects">` (note: the source dir is `src/content/projects`).
- Used by `src/pages/projects/[...page].astro` (preview list), `[...slug].astro` (full), and the homepage.

## Dependencies

### Internal
- `@/components/ExperienceTags.astro`, `@/components/FormattedDate.astro`.

<!-- MANUAL: -->
