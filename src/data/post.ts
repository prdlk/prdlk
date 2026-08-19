import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft posts based on the environment */
export async function getAllPosts(): Promise<CollectionEntry<"writing">[]> {
	return await getCollection("writing", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** groups posts by year, using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYear(posts: CollectionEntry<"writing">[]) {
	return Object.groupBy(posts, (post) => post.data.publishDate.getFullYear().toString());
}
