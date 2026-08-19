import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import satori, { type SatoriOptions } from "satori";
import sharp from "sharp";
import RobotoMonoBold from "@/assets/roboto-mono-700.ttf";
import RobotoMono from "@/assets/roboto-mono-regular.ttf";
import { getAllPosts } from "@/data/post";
import { getAllSpeaking } from "@/data/speaking";
import { getFormattedDate } from "@/utils/date";
import { readCache, writeToCache } from "./_cacheUtil";
import { type OgContent, ogMarkup } from "./_ogMarkup";

const ogOptions: SatoriOptions = {
	// debug: true,
	fonts: [
		{
			data: Buffer.from(RobotoMono),
			name: "Roboto Mono",
			style: "normal",
			weight: 400,
		},
		{
			data: Buffer.from(RobotoMonoBold),
			name: "Roboto Mono",
			style: "normal",
			weight: 700,
		},
	],
	height: 630,
	width: 1200,
};

type Props = OgContent & { cacheDate: Date };

export async function GET(context: APIContext) {
	const { cacheDate, ...content } = context.props as Props;

	let pngBuffer = readCache(content.title, cacheDate);
	if (!pngBuffer) {
		console.info(`Generating new OG image for: ${content.title}`);
		const svg = await satori(ogMarkup(content), ogOptions);
		pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
		writeToCache(content.title, cacheDate, pngBuffer);
	}

	return new Response(new Uint8Array(pngBuffer), {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
}

export async function getStaticPaths() {
	const date = (d: Date) => getFormattedDate(d, { month: "long" });

	const [projects, experiences, speaking] = await Promise.all([
		getCollection("projects"),
		getCollection("experience"),
		getAllSpeaking(),
	]);

	// Writing: skip posts with a custom ogImage, and external (link-out) articles.
	const writing = (await getAllPosts())
		.filter((p) => !p.data.ogImage && !p.data.externalUrl)
		.map((p) => ({
			params: { slug: `writing/${p.id}` },
			props: {
				category: "Writing",
				title: p.data.title,
				excerpt: p.data.description,
				meta: date(p.data.updatedDate ?? p.data.publishDate),
				cacheDate: p.data.updatedDate ?? p.data.publishDate,
			},
		}));

	const projectPaths = projects.map((p) => ({
		params: { slug: `projects/${p.id}` },
		props: {
			category: "Project",
			title: p.data.title,
			excerpt: p.data.description,
			meta: `${p.data.startDate.getFullYear()} – ${p.data.endDate ? p.data.endDate.getFullYear() : "Present"}`,
			cacheDate: p.data.endDate ?? p.data.startDate,
		},
	}));

	const speakingPaths = speaking.map((t) => ({
		params: { slug: `speaking/${t.id}` },
		props: {
			category: "Talk",
			title: t.data.title,
			excerpt: t.data.description,
			meta: t.data.event ?? date(t.data.publishDate),
			cacheDate: t.data.publishDate,
		},
	}));

	const experiencePaths = experiences.map((e) => ({
		params: { slug: `experience/${e.id}` },
		props: {
			category: "Experience",
			title: e.data.role ? `${e.data.role}, ${e.data.organization}` : e.data.organization,
			excerpt: e.data.description,
			meta: e.data.location ?? e.data.organization,
			cacheDate: e.data.startDate,
		},
	}));

	return [...writing, ...projectPaths, ...speakingPaths, ...experiencePaths];
}
