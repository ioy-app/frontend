import { Link } from "react-router-dom";
import Spin from "@/components/base/spin";
import { Profile } from "@/icons";
import { useQuery } from "@tanstack/react-query";

/**
 * Jam
 * @description Displays a jam event card with an avatar image and title. Optionally wrapped in a link to the jam page.
 *
 * @param dataSource - Jam data object containing id, title, and avatar info
 * @param preview - URL of a preview image to display instead of the default avatar
 * @param nolink - Disables the navigation link to the jam page
 * @param className - Additional CSS class names
 * @param size - Avatar size in Tailwind size units (default: 24)
 * @param onClick - Callback fired when the card is clicked (only works in nolink mode) with the jam id
 * @returns A jam card with avatar and title, optionally wrapped in a link
 *
 * @example
 * <Jam dataSource={jamData} size={32} />
 * <Jam dataSource={jamData} nolink onClick={(id) => handleSelect(id)} />
 */
const Jam: React.FC<{
	/** Game data */
	dataSource: Record<string, any>;
	/** Preview game's avatar */
	preview?: string;
	/** Disabled link */
	nolink?: boolean;
	className?: string;
	/** Avatar size */
	size?: number | string;
	/** Click event */
	onClick?: (id: number) => void;
}> = ({
	dataSource,
	preview,
	nolink,
	size = 24,
	className,
	onClick,
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

			return `/api/v1/jams/${dataSource.id}/icon`;
		},
		retry: false,
	});

	const root = (
		<div
			className={`group flex flex-col items-center gap-1 max-w-${size} w-${size} overflow-hidden ${(className && className) || ""}`}
			onClick={() =>
				onClick && nolink && onClick(dataSource?.id)
			}
		>
			<div
				className={`w-${size} h-${size} rounded-xl overflow-hidden aspect-square border border-br ${(!nolink && "group-hover:border-primary transition-colors") || ""}`}
			>
				<Spin loading={status == "pending"}>
					{isError || !data ? (
						<div className="flex w-full h-full items-center justify-center flex-col gap-2 bg-second">
							<img src={Profile} />
						</div>
					) : (
						<img src={data} className="w-full h-full" />
					)}
				</Spin>
			</div>
			{dataSource?.title && (
				<p
					className={`max-w-${size} overflow-hidden text-placeholder wrap-anywhere line-clamp-2 text-center ... group-hover:text-primary transition-colors`}
				>
					{dataSource.title}
				</p>
			)}
		</div>
	);

	return !nolink ? (
		<Link
			to={`/j/${dataSource?.id}`}
			className={`w-${size}`}
		>
			{root}
		</Link>
	) : (
		root
	);
};

export default Jam;