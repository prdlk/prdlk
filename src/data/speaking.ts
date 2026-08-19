import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft talks in production */
export async function getAllSpeaking(): Promise<CollectionEntry<"speaking">[]> {
	return await getCollection("speaking", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}
