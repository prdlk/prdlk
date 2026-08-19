import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";

export function getFormattedDate(
	date: Date | undefined,
	options?: Intl.DateTimeFormatOptions,
): string {
	if (date === undefined) {
		return "Invalid Date";
	}

	return new Intl.DateTimeFormat(siteConfig.date.locale, {
		...(siteConfig.date.options as Intl.DateTimeFormatOptions),
		...options,
	}).format(date);
}

export function collectionDateSort(
	a: CollectionEntry<"writing" | "speaking">,
	b: CollectionEntry<"writing" | "speaking">,
) {
	return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}

/** Sort projects by end date, most recent first; ongoing (no end date) first. */
export function projectDateSort(a: CollectionEntry<"projects">, b: CollectionEntry<"projects">) {
	const ae = a.data.endDate?.getTime() ?? Number.POSITIVE_INFINITY;
	const be = b.data.endDate?.getTime() ?? Number.POSITIVE_INFINITY;
	if (be !== ae) return be - ae;
	return b.data.startDate.getTime() - a.data.startDate.getTime();
}
