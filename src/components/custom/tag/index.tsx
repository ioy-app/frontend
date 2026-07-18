import { useMemo } from "react";
import { BiHash } from "react-icons/bi";
import { NavLink } from "react-router";

/**
 * Tag
 * @description Label/tag component with a deterministic color background based on title hash
 *
 * @param title - Display text for the tag
 * @param nolink - When true, renders without a navigation link
 * @param link - Base path for the navigation link (appended with ?search=title)
 * @param icon - Custom icon element displayed before the title
 * @returns A colored tag pill, optionally wrapped in a NavLink
 *
 * @example
 * <Tag title="action" link="/" icon={<BiHash />} />
 */
const Tag: React.FC<{
	/** Title */
	title: string;
	/** Linkify tag */
	nolink?: boolean;
	/** Path to location */
	link?: string;
	/** Custom icon */
	icon?: React.ReactNode;
}> = ({
	title,
	nolink,
	link,
	icon=<BiHash />
}) => {
	/** Background
	 * @returns HSL color string derived from title hash
	 */
	const backgroundColor = useMemo(() => {
		const saturation = 70;
		const lightness = 65;
		let hash = 5381;
		for (let i = 0; i < title?.length; i++)
			hash = (hash * 33) ^ title?.charCodeAt?.(i);
		hash = hash >>> 0;
		const hue = hash % 360;

		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}, [ title ]);

	/** Contrast text from background
	 * @returns Hex color string (#000 or #fff) for readable text contrast
	 */
	const contrastBg = useMemo(() => {
		const match = backgroundColor.match(
			/hsl\(\d+,\s*\d+%,\s*(\d+)%\)/,
		);
		if (!match) return "#000";
		const lightness = parseInt(match[1], 10);
		return lightness > 60 ? "#000" : "#fff";
	}, [ backgroundColor ]);

	/** Root of tag component
	 * @returns JSX element for the tag pill
	 */
		const root = useMemo(() => (
		<div
			className="px-4 py-1 rounded-full text-default flex gap-2 items-center border bg-back select-none"
			style={{
				background: backgroundColor,
				color: contrastBg,
			}}
		>
			{icon && icon}
			<p>{title}</p>
		</div>
	), [
		backgroundColor,
		contrastBg,
		icon,
		title
	]);

	if (nolink)
		return root;

	return (
		<NavLink
			to={`${link}?search=${title}`}
			className="hover:opacity-75 transition-opacity"
		>
			{root}
		</NavLink>
	);
};

export default Tag;