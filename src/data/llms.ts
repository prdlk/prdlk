import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { getAllExperience } from "@/data/experience";
import { getAllPosts } from "@/data/post";
import { getAllSpeaking } from "@/data/speaking";

/** Builders for /llms.txt (index) and /llms-full.txt (full content), per https://llmstxt.org */

const absUrl = (path: string) => new URL(path, import.meta.env.SITE).href;

const isoDate = (date: Date) => date.toISOString().slice(0, 10);

const introHeading = "# Prad Nukala";

const introSummary =
	"> Engineer & founder. Co-founder/CEO of Sonr ($4.7M raised). Built Layer-1 + full cryptography stack (ZKP/MPC), gasless onboarding, and led high-ownership teams. Optimized for autonomous, high-speed execution.";

const yearRange = (start: Date, end?: Date) =>
	`${start.getFullYear()}–${end ? end.getFullYear() : "Present"}`;

async function getAllContent() {
	const [experience, projects, writing, speaking] = await Promise.all([
		getAllExperience(),
		getCollection("projects").then((entries) =>
			entries.sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf()),
		),
		getAllPosts().then((entries) =>
			entries.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()),
		),
		getAllSpeaking().then((entries) =>
			entries.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()),
		),
	]);
	return { experience, projects, writing, speaking };
}

const writingUrl = (post: CollectionEntry<"writing">) =>
	post.data.externalUrl ?? absUrl(`/writing/${post.id}/`);

/** Curated markdown index of the whole site. */
export async function buildLlmsIndex(): Promise<string> {
	const { experience, projects, writing, speaking } = await getAllContent();

	const lines: string[] = [
		introHeading,
		"",
		introSummary,
		"",
		"## Experience",
		"",
		...experience.map((exp) => {
			const { organization, role, startDate, endDate } = exp.data;
			const detail = [role, organization].filter(Boolean).join(", ");
			return `- [${exp.data.title}](${absUrl(`/experience/${exp.id}/`)}): ${detail} (${yearRange(startDate, endDate)})`;
		}),
		"",
		"## Projects",
		"",
		...projects.map((project) => {
			const { title, description, startDate, endDate } = project.data;
			const summary = description ? ` ${description}` : "";
			return `- [${title}](${absUrl(`/projects/${project.id}/`)}):${summary} (${yearRange(startDate, endDate)})`;
		}),
		"",
		"## Writing",
		"",
		...writing.map((post) => {
			const { title, description, publisher, publishDate } = post.data;
			const via = publisher ? ` — via ${publisher}` : "";
			return `- [${title}](${writingUrl(post)}): ${description}${via} (${isoDate(publishDate)})`;
		}),
		"",
		"## Speaking",
		"",
		...speaking.map((talk) => {
			const { title, description, event, publishDate } = talk.data;
			const at = event ? ` — ${event}` : "";
			return `- [${title}](${absUrl(`/speaking/${talk.id}/`)}): ${description}${at} (${isoDate(publishDate)})`;
		}),
		"",
		"## Optional",
		"",
		`- [Full content](${absUrl("/llms-full.txt")}): Every page's full text in one file`,
		`- [RSS feed](${absUrl("/rss.xml")})`,
		"",
	];

	return lines.join("\n");
}

function section(heading: string, blocks: string[]): string[] {
	return blocks.length ? [`## ${heading}`, "", ...blocks] : [];
}

function entryBlock(header: string, meta: string[], body: string | undefined): string {
	const content = body?.trim();
	return [`### ${header}`, "", ...meta, ...(content ? ["", content] : []), ""].join("\n");
}

/** Full markdown body of every entry, for direct LLM ingestion. */
export async function buildLlmsFull(): Promise<string> {
	const { experience, projects, writing, speaking } = await getAllContent();

	const lines: string[] = [
		`${introHeading} — full content`,
		"",
		introSummary,
		"",
		...section(
			"Experience",
			experience.map((exp) => {
				const { organization, role, location, url, description, tags, startDate, endDate } =
					exp.data;
				return entryBlock(
					exp.data.title,
					[
						`- URL: ${absUrl(`/experience/${exp.id}/`)}`,
						`- Organization: ${organization}`,
						...(role ? [`- Role: ${role}`] : []),
						...(location ? [`- Location: ${location}`] : []),
						...(url ? [`- Website: ${url}`] : []),
						`- Period: ${yearRange(startDate, endDate)}`,
						...(tags.length ? [`- Skills: ${tags.join(", ")}`] : []),
						...(description ? [`- Summary: ${description}`] : []),
					],
					exp.body,
				);
			}),
		),
		...section(
			"Projects",
			projects.map((project) => {
				const { description, link, repo, tags, startDate, endDate } = project.data;
				return entryBlock(
					project.data.title,
					[
						`- URL: ${absUrl(`/projects/${project.id}/`)}`,
						...(link ? [`- Link: ${link}`] : []),
						...(repo ? [`- Repository: ${repo}`] : []),
						`- Period: ${yearRange(startDate, endDate)}`,
						...(tags.length ? [`- Skills: ${tags.join(", ")}`] : []),
						...(description ? [`- Summary: ${description}`] : []),
					],
					project.body,
				);
			}),
		),
		...section(
			"Writing",
			writing.map((post) => {
				const { description, publisher, tags, publishDate, updatedDate } = post.data;
				return entryBlock(
					post.data.title,
					[
						`- URL: ${writingUrl(post)}`,
						...(publisher ? [`- Publisher: ${publisher}`] : []),
						`- Published: ${isoDate(publishDate)}`,
						...(updatedDate ? [`- Updated: ${isoDate(updatedDate)}`] : []),
						...(tags.length ? [`- Tags: ${tags.join(", ")}`] : []),
						`- Summary: ${description}`,
					],
					post.body,
				);
			}),
		),
		...section(
			"Speaking",
			speaking.map((talk) => {
				const { description, event, youtubeId, tags, publishDate } = talk.data;
				return entryBlock(
					talk.data.title,
					[
						`- URL: ${absUrl(`/speaking/${talk.id}/`)}`,
						...(event ? [`- Event: ${event}`] : []),
						`- Video: https://www.youtube.com/watch?v=${youtubeId}`,
						`- Date: ${isoDate(publishDate)}`,
						...(tags.length ? [`- Tags: ${tags.join(", ")}`] : []),
						`- Summary: ${description}`,
					],
					talk.body,
				);
			}),
		),
	];

	return lines.join("\n");
}
