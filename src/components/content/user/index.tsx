import React, { useMemo } from "react";
import { Profile } from "@/icons";
import { NavLink } from "react-router-dom";
import Spin from "../../base/spin";
import { useQuery } from "@tanstack/react-query";
import UserProps from "@/pages/users/api";

/**
 * User
 * @description Displays a user avatar with an optional login name. Supports multiple sizes, animated donut border for donors, and optional navigation link to the user profile.
 *
 * @param login - User's login name displayed next to the avatar
 * @param hideLogin - Hides the login text
 * @param preview - URL of a preview image to display instead of the default avatar
 * @param size - Avatar size preset ("small" | "middle" | "large" | "full") or a numeric Tailwind size value (default: "large")
 * @param nolink - Disables the navigation link to the user profile
 * @param className - Additional CSS class names
 * @param dataSource - User data object containing is_avatar and is_donut status
 * @param ref - Forwarded ref to the root div element
 * @param onClick - Callback fired when the avatar is clicked with the user's login
 * @param vertical - Arranges the avatar and login name vertically
 * @returns A user avatar card with optional login text, optionally wrapped in a navigation link
 *
 * @example
 * <User login="username" dataSource={userData} />
 * <User login="username" size="small" nolink vertical />
 */
const User: React.FC<{
	/** Login */
	login?: string;
	/** Hide Login */
	hideLogin?: boolean;
	/** Profile image */
	preview?: string;
	/** Size */
	size?: "small" | "middle" | "large" | number | "full";
	/** Disabled link */
	nolink?: boolean;
	/** Class name */
	className?: string;
	/** Profile data */
	dataSource?: UserProps;
	/** Ref component */
	ref?: React.Ref<HTMLDivElement>;
	/** Click event  */
	onClick?: (login: string) => void;
	/** Login place */
	vertical?: boolean;
}> = ({
	login,
	hideLogin,
	className,
	preview,
	nolink,
	size="large",
	dataSource,
	ref,
	onClick,
	vertical
}) => {
	const query = useQuery({
		queryKey: ["avatar", login, preview],
		queryFn: async () => {
			if (!dataSource?.is_avatar) return null;

			if (preview) {
				const file = await fetch(preview);
				if (!file.ok) throw new Error();

				const resource = await file.blob();
				return URL.createObjectURL(resource);
			}

			return `/api/v1/users/${login}/avatar`;
		},
		retry: false,
	});


	const avatarSize = useMemo(() => {
		switch(size) {
			case "small": return 10; break;
			case "middle": return 24; break;
			case "large": return 32; break;
			default: return size; break;
		}
	}, [ size ]);

	const isDonut = useMemo(() => dataSource?.is_donut, []);

	const root = (
		<div
			className={`${!nolink && "group" || ""} flex gap-2 w-fit items-center ${vertical && "flex-col" || ""} ${!nolink && "hover:opacity-75 cursor-pointer" || ""} transition-opacity ${className && className || ""}`}
			onClick={() => onClick && onClick?.(login)}
			ref={ref}
		>
			<div className={`w-${avatarSize} h-${avatarSize} aspect-square bg-primary overflow-hidden rounded-full ${isDonut && "animate-donate bg-linear-to-b from-primary to-second group-hover:from-second group-hover:to-primary p-0.75 bg-size-[100%_150%] [animation-duration:7s]" || ""}`}>
				<Spin loading={query?.isLoading}>
					<img
						src={(query?.isError || !query?.data) ? Profile : query?.data}
						className="w-full h-full rounded-full"
					/>
				</Spin>
			</div>
			{(login && !hideLogin) && <p className={`group-hover:text-primary text-placeholder ${isDonut && "text-second" || ""} transition-colors w-fit`}>{login}</p>}
		</div>
	);

	return !nolink ? (
		<NavLink
			to={`/u/${login}`}
			className="flex w-fit"
		>
			{root}
		</NavLink>
	) : root;
};

export default User;
