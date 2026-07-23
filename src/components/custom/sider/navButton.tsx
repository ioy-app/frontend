import Button from "@/components/base/button";
import Popup from "@/components/base/popup";
import { NavLink } from "react-router";

/**
 * Navigation button 
 * @description Using on sider component
 *
 * @example
 * <NavButton />
*/
const NavButton: React.FC<{
	/** Title */
	title?: string;
	/** To */
	to: string;
	/** Icon */
	Icon: React.ReactNode;
}> = ({
	title,
	to,
	Icon,
	collapse
}) => (
	<Popup label={title}>
		<NavLink
			to={to}
			onClick={(e) => {
				if (typeof(to) == "function") {
					e.preventDefault();
					to && to?.();
				}
			}}
			className={({ isActive }) => `${(isActive && typeof(to) == "string") && "text-primary bg-text/3" || "hover:bg-text/5"} rounded-full aspect-square transition-colors flex justify-center items-center h-full`}
		>
			{({ isActive }) => (
				<Button
					variant="clear"
					className={`w-full justify-start ${(isActive && typeof(to) == "string") ? "text-primary" : "text-text"} h-full`}
				>
					{Icon && <Icon />}
				</Button>
			)}
		</NavLink>
	</Popup>
);

export default NavButton;
