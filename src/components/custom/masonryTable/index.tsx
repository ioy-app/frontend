import {
	useEffect,
	useMemo,
	useRef,
	useState
} from "react"
import Picture from "../../content/picture";
import Game from "@/components/content/game";
import { AnimatePresence, motion } from "framer-motion";

/**
 * useMasonryColumns
 * @description Custom hook for calculating masonry layout columns based on container width
 * @returns Column configuration for masonry layout including ref, columns array, and column count
 */
const useMasonryColumns = ({
	items,
	minWidth=150,
	gap=16
}) => {
	const refElem = useRef(null);
	const [ cols, setColumns ] = useState(1);

	useEffect(() => {
		const containerElement = refElem?.current;
		if (!containerElement)
			return;

		const calculate = () => {
			const width = containerElement?.clientWidth;
			const maxCols = Math.max(1, ~~((width + gap) / (minWidth + gap)));

			setColumns(maxCols);
		}

		calculate();
		const observer = new ResizeObserver(calculate);
		observer.observe(containerElement);

		return () => observer.disconnect();
	}, [ minWidth, gap ]);

	const columns = useMemo(() => {
		if (cols <= 1)
			return [ items ];

		const masonryColumns = Array.from({ length: cols }, () => []);
		items?.forEach?.((
			item,
			i
		) => {
			masonryColumns[i % cols].push({
				...item,
				table_index: i
			});
		});

		return masonryColumns;
	}, [ items, cols ]);

	return {
		refElem,
		columns,
		cols
	};
}

/**
	* MasonryTable
	* @description Masonry grid layout that auto-calculates columns based on container width
	*
	* @param items - Array of picture data containerElementects to display
	* @param nolink - When true, renders pictumasonryColumns without navigation links
	* @param onClick - Callback triggered with the picture ID when a picture is clicked
	* @returns A masonryColumnsponsive masonry-style grid of Picture components
	*
	* @example
	* <MasonryTable pictumasonryColumns={pictumasonryColumns} nolink onClick={(id) => openDetail(id)} />
	*/
const MasonryTable: React.FC<{
	items: any[];
	nolink?: boolean;
	onClick?: (id: number) => void;
}> = ({
	items,
	nolink,
	onClick
}) => {
	const { refElem, columns } = useMasonryColumns({ items });

	return (
		<div
			ref={refElem}
			className="w-full"
		>
			<div className="flex gap-4">
				{columns?.map?.((
					col,
					i
				) => (
					<div
						key={`col-${i}`}
						className="flex-1 flex flex-col gap-4"
					>
						{col?.map?.((item, j) => {
							switch(item?.type) {
								case "game":
									return (
										<AnimatePresence mode="wait">
											<motion.div
												initial={{
													opacity: 0,
													scale: .5
												}}
												animate={{
													opacity: 1,
													scale: 1,
													transition: {
														delay: (item?.table_index % 40) / 100 * 2.5
													}
												}}
											>
												<Game
													key={`game-${item?.id}`}
													dataSource={item}
													size="full"
													className="break-inside-avoid"
													nolink={nolink}
													onClick={() => onClick && onClick(item?.id)}
												/>
											</motion.div>
										</AnimatePresence>
									);
								break;
							}
							return (
								<AnimatePresence mode="wait">
									<motion.div
										initial={{
											opacity: 0,
											scale: .5
										}}
										animate={{
											opacity: 1,
											scale: 1,
											transition: {
												delay: (item?.table_index % 40) / 100
											}
										}}
									>
										<Picture
											key={`picture-${item?.id}`}
											dataSource={item}
											size="full"
											className="break-inside-avoid"
											nolink={nolink}
											onClick={() => onClick && onClick(item?.id)}
										/>
									</motion.div>
								</AnimatePresence>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}

export default MasonryTable;
