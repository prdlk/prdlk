import type { APIRoute } from "astro";
import { buildLlmsIndex } from "@/data/llms";

export const GET: APIRoute = async () =>
	new Response(await buildLlmsIndex(), {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
