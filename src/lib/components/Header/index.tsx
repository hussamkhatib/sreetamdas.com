import { NavbarDesktop, NavbarMobile } from "./Nav";

import { LinkTo } from "@/lib/components/Anchor";
import { ColorSchemeToggle } from "@/lib/domains/colorScheme/client";

export const Header = () => (
	<div className="sticky top-0 z-10 h-[60px] w-screen bg-background">
		<a
			id="skip-link"
			href="#main-content"
			className="absolute left-8 top-8 h-px w-px -translate-y-full overflow-hidden rounded-global bg-primary p-2 text-background [clip:rect(1px_1px_1px_1px)] visited:no-underline hover:underline hover:decoration-current hover:decoration-solid hover:decoration-2 focus:block focus:h-auto focus:w-auto focus:translate-y-0 focus:[clip:auto] focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary dark:text-foreground"
		>
			Skip to main content
		</a>
		<header className="mx-auto grid h-full w-full max-w-[--max-width] grid-cols-[max-content_auto] content-center gap-8 py-4">
			<LinkTo href="/">
				<svg
					aria-label="Home"
					width={25}
					height={25}
					viewBox="0 0 25 25"
					xmlns="http://www.w3.org/2000/svg"
					className="fill-primary text-primary"
				>
					<title>Home</title>
					<rect width="25" height="25" rx="6" fill="currentColor" />
				</svg>
			</LinkTo>
			<div className="grid grid-flow-col place-items-center justify-center gap-x-4 justify-self-end">
				<NavbarDesktop />
				<NavbarMobile />
				<ColorSchemeToggle />
			</div>
		</header>
	</div>
);
