import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	// ! Please remember to replace the following site property with your own domain, used in astro.config.ts
	url: "https://www.pradnukala.com/",
	title: "Prad Nukala",
	author: "Prad Nukala",
	description: "Engineer & founder. Projects, experience, writing and talks.",
	lang: "en-US",
	ogLocale: "en_US",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "en-GB",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
};

// Social links shown in the homepage intro and the footer's icon row.
export const socialLinks: {
	friendlyName: string;
	link: string;
	name: string;
	isWebmention?: boolean;
}[] = [
	{ friendlyName: "GitHub", link: "https://github.com/prdlk", name: "simple-icons:github" },
	{
		friendlyName: "LinkedIn",
		link: "https://linkedin.com/in/pradn",
		name: "simple-icons:linkedin",
	},
	{ friendlyName: "X", link: "https://x.com/basedprad", name: "simple-icons:x" },
	{ friendlyName: "Medium", link: "https://medium.com/@prnk28", name: "simple-icons:medium" },
	{
		friendlyName: "Crunchbase",
		link: "https://www.crunchbase.com/person/pradyumn-nukala",
		name: "simple-icons:crunchbase",
	},
	{
		friendlyName: "Discord",
		link: "https://discord.com/users/788422222930640936",
		name: "simple-icons:discord",
	},
	{ friendlyName: "Telegram", link: "https://t.me/prdnk", name: "simple-icons:telegram" },
	{ friendlyName: "Email", link: "mailto:i@prad.nu", name: "lucide:mail" },
];

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/experience/",
		title: "Experience",
	},
	{
		path: "/projects/",
		title: "Projects",
	},
	{
		path: "/writing/",
		title: "Writing",
	},
	{
		path: "/speaking/",
		title: "Speaking",
	},
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
};
