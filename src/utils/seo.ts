import { siteConfig, socialLinks } from "@/site.config";

type Schema = Record<string, unknown>;

/** Absolute URL from a site-root path. */
export const abs = (path: string) => new URL(path, siteConfig.url).href;

const authorRef = () => ({
	"@type": "Person",
	name: siteConfig.author,
	url: siteConfig.url,
});

/** schema.org BreadcrumbList — Google renders these as the breadcrumb trail in results. */
export function breadcrumbList(items: { name: string; path: string }[]): Schema {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((it, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: it.name,
			item: abs(it.path),
		})),
	};
}

/** Person — connects social profiles (sameAs) and skills (knowsAbout) to the author. */
export function personSchema(knowsAbout: string[] = []): Schema {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: siteConfig.author,
		url: siteConfig.url,
		image: abs("/avatar.png"),
		jobTitle: "Engineer & Founder",
		description: siteConfig.description,
		sameAs: socialLinks.filter((s) => !s.link.startsWith("mailto:")).map((s) => s.link),
		...(knowsAbout.length ? { knowsAbout } : {}),
	};
}

export function websiteSchema(): Schema {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.title,
		url: siteConfig.url,
		description: siteConfig.description,
		author: authorRef(),
	};
}

export function articleSchema(opts: {
	title: string;
	description?: string;
	path: string;
	image: string;
	datePublished: Date;
	dateModified?: Date;
	keywords?: string[];
}): Schema {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: opts.title,
		description: opts.description,
		image: abs(opts.image),
		datePublished: opts.datePublished.toISOString(),
		dateModified: (opts.dateModified ?? opts.datePublished).toISOString(),
		author: authorRef(),
		publisher: authorRef(),
		mainEntityOfPage: { "@type": "WebPage", "@id": abs(opts.path) },
		...(opts.keywords?.length ? { keywords: opts.keywords.join(", ") } : {}),
	};
}

export function videoSchema(opts: {
	title: string;
	description: string;
	path: string;
	thumbnail: string;
	uploadDate: Date;
	embedUrl?: string;
	contentUrl?: string;
}): Schema {
	return {
		"@context": "https://schema.org",
		"@type": "VideoObject",
		name: opts.title,
		description: opts.description,
		thumbnailUrl: abs(opts.thumbnail),
		uploadDate: opts.uploadDate.toISOString(),
		...(opts.embedUrl ? { embedUrl: opts.embedUrl } : {}),
		...(opts.contentUrl ? { contentUrl: opts.contentUrl } : {}),
	};
}

/** CollectionPage wrapping an ItemList — for section/list pages. */
export function collectionPageSchema(opts: {
	name: string;
	description?: string;
	path: string;
	items: { name: string; path: string }[];
}): Schema {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: opts.name,
		...(opts.description ? { description: opts.description } : {}),
		url: abs(opts.path),
		mainEntity: {
			"@type": "ItemList",
			itemListElement: opts.items.map((it, i) => ({
				"@type": "ListItem",
				position: i + 1,
				name: it.name,
				url: abs(it.path),
			})),
		},
	};
}

export function creativeWorkSchema(opts: {
	title: string;
	description?: string;
	path: string;
	url?: string;
	repo?: string;
	dateCreated: Date;
	keywords?: string[];
}): Schema {
	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: opts.title,
		description: opts.description,
		url: opts.url ?? abs(opts.path),
		dateCreated: opts.dateCreated.toISOString(),
		author: authorRef(),
		...(opts.repo ? { codeRepository: opts.repo } : {}),
		...(opts.keywords?.length ? { keywords: opts.keywords.join(", ") } : {}),
	};
}
