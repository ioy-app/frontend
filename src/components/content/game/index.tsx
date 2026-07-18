import GameProps from "@/pages/games/api";
import { Link } from "react-router-dom";
import Spin from "@/components/base/spin";
import { Profile } from "@/icons";
import { useQuery } from "@tanstack/react-query";
import { BiSolidCrown } from "react-icons/bi";
import { FaFireAlt } from "react-icons/fa";

/**
 * Game
 * @description Displays a game card with avatar, optional jam result badge, hype indicator, and title. Optionally wrapped in a link to the game page.
 *
 * @param dataSource - Game data object containing id, title, is_avatar, jam_result, and hype status
 * @param preview - URL of a preview image to display instead of the default avatar
 * @param nolink - Disables the navigation link to the game page
 * @param size - Avatar size in Tailwind size units (default: 24)
 * @param onClick - Callback fired when the card is clicked (only works in nolink mode) with the game id
 * @param className - Additional CSS class names
 * @returns A game card with avatar, badges, and title, optionally wrapped in a link
 *
 * @example
 * <Game dataSource={gameData} size={32} />
 * <Game dataSource={gameData} nolink onClick={(id) => handleSelect(id)} />
 */
const Game: React.FC<{
	/** Game data */
	dataSource: GameProps;
	/** Preview game's avatar */
	preview?: string;
	/** Disabled link */
	nolink?: boolean;
	/** Avatar size */
	size?: number | string;
	/** Click event */
	onClick?: (id: number) => void;
	/** Class name */
	className?: string;
}> = ({
	dataSource,
	preview,
	nolink,
	size = 24,
	onClick,
	className
}) => {
	const { status, data, isError } = useQuery({
		queryKey: ["game", dataSource, preview],
		queryFn: async () => {
			if (!dataSource?.is_avatar) return null;

			if (preview) {
				const file = await fetch(preview);
				if (!file.ok) throw new Error();

				const resource = await file.blob();
				return URL.createObjectURL(resource);
			}

			return `/api/v1/games/${dataSource.id}/icon`;
		},
		retry: false,
	});

	const root = (
		<div
			className={`group flex flex-col items-center gap-1 max-w-${size}`}
			onClick={() =>
				onClick && nolink && onClick(dataSource?.id)
			}
		>
			<div
				className={`relative w-full h-${size} aspect-square ${(!nolink && "transition-colors") || ""} ${dataSource?.hype && "border-4 dark:border-amber-400 rounded-2xl dark:group-hover:border-amber-500 border-red-400 group-hover:border-red-500" || ""}`}
			>
				<Spin loading={status == "pending"}>
					{isError || !data ? (
						<div className="flex w-full h-full items-center justify-center flex-col gap-2 bg-primary rounded-xl overflow-hidden">
							<img src={Profile} />
						</div>
					) : (
						<img src={data} className="w-full h-full rounded-xl overflow-hidden" />
					)}
				</Spin>
				{(dataSource?.jam_result || dataSource?.hype) && (
					<div className="absolute -top-2 -right-2">
						{dataSource?.jam_result?.place == 1 && <BiSolidCrown className="text-amber-300 text-xl bg-back rounded-full p-0.5" />}
						{dataSource?.jam_result?.place == 2 && <BiSolidCrown className="text-blue-100 text-xl bg-back rounded-full p-0.5" />}
						{dataSource?.jam_result?.place == 3 && <BiSolidCrown className="text-second text-xl bg-back rounded-full p-0.5" />}
						{dataSource?.hype && <FaFireAlt className="dark:text-amber-300 text-red-400 text-xl bg-back rounded-full p-0.5" />}
					</div>
				)}
				
			</div>
			{dataSource?.title && (
				<p
					className={`max-w-${size} overflow-hidden text-placeholder wrap-anywhere line-clamp-2 text-center ... group-hover:text-primary transition-colors ${dataSource?.hype && "dark:text-amber-300 text-red-400 dark:group-hover:text-amber-500! group-hover:text-red-500!" || ""}`}
				>
					{dataSource.title}
				</p>
			)}
		</div>
	);

	return !nolink ? (
		<Link
			to={`/g/${dataSource?.id}`}
			className={`w-${size} ${className && className || ""}`}
		>
			{root}
		</Link>
	) : (
		root
	);
};

export default Game;
