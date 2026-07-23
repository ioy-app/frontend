import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Helpers popup
 * @example
 * return <Popup />
 * @returns Hover-triggered tooltip popup with animated reveal
 */
const Popup: React.FC<{
	children: React.ReactNode;
	align?: "l" | "r" | "t" | "b";
	label: string;
}> = ({ children, align = "b", label }) => {
	const childRef = useRef(null);
	const [ isHover, setHover ] = useState<boolean>(false);

	const getChildPosition = useCallback(() => {
		if (!childRef?.current)
			return;

		const rect = childRef?.current?.getBoundingClientRect?.();
		return {
			x: rect?.left + window?.scrollX,
			y: rect?.top + window?.scrollY,	
			w: rect?.width,
			h: rect?.height
		}
	}, [ childRef ]);

 	const data = getChildPosition();

	return (
		<div
			ref={childRef}
			className="relative flex"
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{children}	
			{createPortal((
				<AnimatePresence
					mode="wait"
					initial={false}
				>
					<motion.div
						key={label}
						className="fixed pointer-events-none w-fit px-4 py-0 border border-br bg-back rounded-full text-placeholder shadow-2xs z-50 text-nowrap text-text"
						style={{
							left: `${data?.x + data?.w + 24}px`,
							top: `${data?.y + data?.h * .1}px`
						}}
						variants={{
							show: {
								opacity: 1,
								transition: {
									delay: .35
								}
							},
							hide: {
								opacity: 0
							}
						}}
						animate={isHover ? "show" : "hide"}
						exit={{
							opacity: 0
						}}
						transition={{
							duration: 0.125
						}}
					>
						{label}
					</motion.div>
				</AnimatePresence>
			), document.body)}
		</div>
	);
};

export default Popup;
