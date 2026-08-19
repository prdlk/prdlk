import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}

const titleSchema = z.string().max(60);

const baseSchema = z.object({
	title: titleSchema,
});

// Experiences double as a taxonomy: projects, writing & speaking reference them
// by id so each experience page can render everything filed under it.
const experienceRefs = z.array(reference("experience")).default([]);

// /writing section.
const writing = defineCollection({
	loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		baseSchema.extend({
			description: z.string(),
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			draft: z.boolean().default(false),
			ogImage: z.string().optional(),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			experiences: experienceRefs,
			// External articles (PESOS): link out to the publisher instead of a local page.
			externalUrl: z.url().optional(),
			publisher: z.string().optional(), // e.g. "Fast Company", "Medium"
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			pinned: z.boolean().default(false),
		}),
});

// /projects section.
const projects = defineCollection({
	loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		baseSchema.extend({
			description: z.string().optional(),
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			link: z.url().optional(),
			repo: z.url().optional(),
			// Skills double as tags for cross-project categorization.
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			experiences: experienceRefs,
			startDate: z.coerce.date(),
			endDate: z.coerce.date().optional(), // omit for ongoing projects
		}),
});

// Experience = resume entries that also act as the taxonomy for the site.
const experience = defineCollection({
	loader: glob({ base: "./src/content/experience", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		organization: z.string(),
		role: z.string().optional(),
		location: z.string().optional(),
		url: z.url().optional(),
		description: z.string().optional(),
		// Skills double as site-wide tags (see /tags).
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(), // omit for current/ongoing
	}),
});

// Speaking = talks/presentations rendered with an embedded YouTube player.
const speaking = defineCollection({
	loader: glob({ base: "./src/content/speaking", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		description: z.string(),
		youtubeId: z.string(), // YouTube video ID
		event: z.string().optional(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
		experiences: experienceRefs,
		publishDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
	}),
});

export const collections = { writing, projects, experience, speaking };
