import { type CollectionEntry, getCollection } from "astro:content";

/** URL-safe slug for a skill/tag (tags are already lowercased by the schema). */
export const slugifyTag = (tag: string) =>
	tag
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

const draftFilter = ({ data }: { data: { draft?: boolean } }) =>
	import.meta.env.PROD ? !data.draft : true;

/** All tag-bearing content across the four collections (drafts filtered in prod). */
export async function getTaggedCollections() {
	const [projects, experience, writing, speaking] = await Promise.all([
		getCollection("projects"),
		getCollection("experience"),
		getCollection("writing", draftFilter),
		getCollection("speaking", draftFilter),
	]);
	return { projects, experience, writing, speaking };
}

export type TaggedCollections = Awaited<ReturnType<typeof getTaggedCollections>>;

type AnyTagged = CollectionEntry<"projects" | "experience" | "writing" | "speaking">;
const tagsOf = (entry: AnyTagged) => entry.data.tags ?? [];

/** Map of slug → { label, count } across every collection, for the tag index. */
export function getTagIndex(cols: TaggedCollections) {
	const index = new Map<string, { label: string; count: number }>();
	for (const col of Object.values(cols)) {
		for (const entry of col) {
			for (const tag of tagsOf(entry)) {
				const slug = slugifyTag(tag);
				const cur = index.get(slug) ?? { label: tag, count: 0 };
				cur.count += 1;
				index.set(slug, cur);
			}
		}
	}
	return index;
}

/** Every entry, grouped by collection, that carries the given tag label. */
export function filterByTag(cols: TaggedCollections, label: string) {
	const has = (e: AnyTagged) => tagsOf(e).includes(label);
	return {
		projects: cols.projects.filter(has),
		experience: cols.experience.filter(has),
		writing: cols.writing.filter(has),
		speaking: cols.speaking.filter(has),
	};
}
