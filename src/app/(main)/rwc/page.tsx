import { FiLink } from "react-icons/fi";
import {
	type BundledTheme,
	type ThemeRegistration,
	type HighlighterGeneric,
} from "shikiji/types.mjs";

import module_css from "./CodeSnippet.module.css";

import { ViewsCounter } from "@/lib/components/ViewsCounter";
import { fetchGist } from "@/lib/domains/GitHub";
import { type preloaded_langs, getKarmaHighlighter, getKarmaTheme } from "@/lib/domains/shiki";

// export const runtime = "edge";

const GITHUB_RWC_GIST_ID = process.env.GITHUB_RWC_GIST_ID!;

export default async function RWCPage() {
	const gist = await fetchGist(GITHUB_RWC_GIST_ID);

	const karma_highlighter = await getKarmaHighlighter();
	const karma_theme = await getKarmaTheme();

	return (
		<>
			<h1 className="pb-20 pt-10 font-serif text-8xl">/rwc</h1>

			{Object.values(gist.files!).map((file_object) => (
				<CodeSnippetBlock
					key={file_object?.filename}
					filename={file_object?.filename}
					highlighter={karma_highlighter}
					theme={karma_theme}
					lang={file_object?.language?.toLowerCase()}
					code={file_object?.content}
				/>
			))}

			<ViewsCounter slug="/rwc" />
		</>
	);
}

type Props = {
	code?: string;
	highlighter: HighlighterGeneric<(typeof preloaded_langs)[number], BundledTheme | "karma">;
	theme?: ThemeRegistration;
	lang?: string;
	filename?: string;
};
function CodeSnippetBlock(props: Props) {
	const { code, filename, highlighter, lang = "js", theme } = props;

	if (!code) return null;

	const backgroundColor = theme?.bg;
	const html = highlighter.codeToHtml(code, { theme: "karma", lang });
	const cleaned_html = html.replace(/(^<pre [^>]*>)/, "").replace(/(<\/pre>$)/, "");

	const slug = filename?.replaceAll(/[\s.]/g, "_").toLowerCase();

	return (
		<article className="my-20 flex flex-col">
			<div className="flex justify-between">
				<h2 className="group font-mono text-2xl text-primary" id={slug}>
					<a
						href={`#${slug}`}
						className="absolute -translate-x-[125%] translate-y-1 text-primary opacity-0 transition-opacity group-hover:opacity-75 max-md:hidden"
					>
						<FiLink aria-label={slug} />
					</a>
					{filename}
				</h2>
				<span
					className="rounded-t-global px-2 py-1 font-mono uppercase text-zinc-400"
					style={{ backgroundColor }}
				>
					{lang}
				</span>
			</div>
			<pre
				className={module_css["code-snippet"]}
				style={{ backgroundColor }}
				dangerouslySetInnerHTML={{ __html: cleaned_html }}
			/>
		</article>
	);
}
