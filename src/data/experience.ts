import { type CollectionEntry, getCollection } from "astro:content";

/** All experiences, most recent (by startDate) first. */
export async function getAllExperience(): Promise<CollectionEntry<"experience">[]> {
	const entries = await getCollection("experience");
	return entries.sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf());
}

const hasExperience = (
	entry: { data: { experiences: { id: string }[] } },
	id: string,
): boolean => entry.data.experiences.some((ref) => ref.id === id);

/** Every project, writing & talk filed under a given experience id. */
export async function getContentForExperience(id: string) {
	const [projects, writing, speaking] = await Promise.all([
		getCollection("projects", (e) => hasExperience(e, id)),
		getCollection("writing", (e) => (import.meta.env.PROD ? !e.data.draft : true) && hasExperience(e, id)),
		getCollection("speaking", (e) => (import.meta.env.PROD ? !e.data.draft : true) && hasExperience(e, id)),
	]);
	return { projects, writing, speaking };
}
