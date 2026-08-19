import { siteConfig } from "@/site.config";

// OG image markup. Structure adapted from ogimagecn's "Blog" component
// (https://www.ogimagecn.com/docs/components/blog) — a type badge, title,
// excerpt, and author/meta line — restyled to match the site's minimal
// social-card.png: dark background, green accent frame, mono type.
//
// Built as a plain Satori node tree (not satori-html) so dynamic text is
// rendered literally — satori-html escapes `&`/`<`/`>` in interpolations and
// would otherwise render e.g. "Founder & Lead Engineer" as "Founder &amp;…".

const BG = "#1d1f21";
const WHITE = "#ffffff";
const MUTED = "#8a8f98";
const ACCENT = "#2bbc89";

type Style = Record<string, string | number>;
type Node = { type: string; props: { style: Style; children?: unknown } };

const el = (type: string, style: Style, children?: unknown): Node => ({
	type,
	props: { style: { display: "flex", ...style }, ...(children !== undefined ? { children } : {}) },
});

export interface OgContent {
	/** Content type shown as the eyebrow label, e.g. "Writing", "Project", "Talk". */
	category: string;
	title: string;
	/** Short description shown under the title. */
	excerpt?: string;
	/** Secondary line next to the author, e.g. a formatted date or event. */
	meta: string;
}

export const ogMarkup = ({ category, title, excerpt, meta }: OgContent): Node =>
	el(
		"div",
		{
			flexDirection: "column",
			width: "100%",
			height: "100%",
			justifyContent: "space-between",
			backgroundColor: BG,
			color: MUTED,
			fontFamily: "Roboto Mono",
			border: `14px solid ${ACCENT}`,
			padding: "72px",
		},
		[
			el("div", { alignItems: "center", justifyContent: "space-between", width: "100%" }, [
				el(
					"div",
					{
						color: ACCENT,
						fontSize: "26px",
						fontWeight: 600,
						textTransform: "uppercase",
						letterSpacing: "0.18em",
					},
					category,
				),
				el("div", { color: WHITE, fontSize: "28px", fontWeight: 700 }, siteConfig.title),
			]),
			el("div", { flexDirection: "column" }, [
				el(
					"div",
					{
						color: WHITE,
						fontWeight: 700,
						fontSize: title.length > 48 ? "62px" : "78px",
						lineHeight: 1.1,
						letterSpacing: "-0.02em",
						maxWidth: "1040px",
					},
					title,
				),
				...(excerpt
					? [
							el(
								"div",
								{ color: MUTED, fontSize: "32px", lineHeight: 1.4, maxWidth: "980px", marginTop: "32px" },
								excerpt,
							),
						]
					: []),
			]),
			el("div", { color: MUTED, fontSize: "26px" }, `by ${siteConfig.author} · ${meta}`),
		],
	);
