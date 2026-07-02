import { useMemo } from "react";
import { BiHash } from "react-icons/bi";
import { NavLink } from "react-router";

/**
 * Tag component
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
	/** Background */
	const bg = useMemo(() => {
		const saturation = 70;
		const lightness = 65;
		let hash = 5381;
		for (let i = 0; i < title?.length; i++)
			hash = (hash * 33) ^ title?.charCodeAt?.(i);
		hash = hash >>> 0;
		const hue = hash % 360;

		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}, [ title ]);

	/** Contrast text from background */
	const contrastBg = useMemo(() => {
		const match = bg.match(
			/hsl\(\d+,\s*\d+%,\s*(\d+)%\)/,
		);
		if (!match) return "#000";
		const lightness = parseInt(match[1], 10);
		return lightness > 60 ? "#000" : "#fff";
	}, [ bg ]);

	/** Root of tag component */
	const root = useMemo(() => (
		<div
			className="px-4 py-1 rounded-full text-default flex gap-2 items-center border bg-back select-none"
			style={{
				background: bg,
				color: contrastBg,
			}}
		>
			{icon && icon}
			<p>{title}</p>
		</div>
	), [
		bg,
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