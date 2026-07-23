import imgLabel from "@/icons/label.svg";
import imgLogo from "@/icons/logo.svg";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import {
    BiArchive,
	BiCalendar,
	BiCog,
	BiCrop,
	BiImage,
	BiJoystick,
	BiLogIn,
} from "react-icons/bi";
import Spin from "../../base/spin";
import User from "../../content/user";
import { Auth } from "@/pages";
import { useModal } from "@/hooks";
import { useSelector } from "react-redux";
import i18n from "@/i18n";
import { useState } from "react";
import NavButton from "./navButton";
import Edit from "@/pages/users/modals/edit";
import { paths } from "@/routes";

/**
	* Sider
	* @description Sidebar navigation with links, dark mode toggle, language selector, and user login/avatar
	*
	* @param collapse - When true, renders a collapsed version showing only icons
	* @returns A sticky sidebar with navigation links, theme toggle, language selector, and user auth button
	*
	* @example
	* <Sider collapse={false} />
	*/
const Sider: React.FC<{
	collapse?: boolean;
}> = ({
	collapse
}) => {
	const { t } = useTranslation();
	const { token, login, loading, is_avatar, is_donut } = useSelector(
		(state: any) => state?.login,
	);
	const { modal } = useModal();
	const prefersDarkMode =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)")
				.matches;
	const [darkMode, setDarkMode] = useState<
		"dark" | "light"
	>(
		(localStorage.getItem("theme") ||
			(prefersDarkMode && "dark")) as "dark" | "light",
	);

	const handleChangeLanguage = ({ target: { value } }) => {
		i18n.changeLanguage(value);
		localStorage.setItem("lang", value);
	};

	const toggleDarkMode = () => {
		const htmlEl = document.documentElement;
		htmlEl.classList.toggle("dark");
		const value = htmlEl.classList.contains("dark")
			? "dark"
			: "light";
		localStorage.setItem("theme", value);
		setDarkMode(value);
	};

	if (darkMode == "dark")
		document.documentElement.classList.add("dark");

	return (
		<div className="h-fit">
			<aside className={`sticky top-0 left-0 max-md:bottom-0 max-md:top-auto h-screen max-md:w-screen max-md:h-24 box-border z-11`}>
				<div className="flex flex-col items-center gap-4 rounded-full h-full md:pl-4 md:py-4 max-md:p-4 max-md:flex-row">
					<NavLink
						to="/"
						className="flex justify-center items-center md:w-14 max-md:h-18"
					>
						<div className="flex justify-center items-center w-full h-full">
							<img src={collapse? imgLogo : imgLabel} className="flex justify-center items-center p-1 w-full aspect-square h-full z-1 pointer-events-none select-none" />
						</div>
					</NavLink>	
					<div className="h-full max-md:w-full flex flex-col max-md:flex-row gap-4 overflow-y-auto max-md:overflow-x-auto no-scrollbar border border-br rounded-full">
						<nav className="flex flex-col max-md:flex-row gap-4 flex-1 md:p-2 max-md:p-2">
							<NavButton
								to="/games"
								Icon={BiJoystick}
								title={t("buttons.nav.games")}
								collapse={collapse}
							/>
							<NavButton
								to="/pictures"
								Icon={BiImage}
								title={t("buttons.nav.pictures")}
								collapse={collapse}
							/>
						</nav>
						{token && (
							<nav className="flex flex-col max-md:flex-row gap-4 md:p-2 max-md:p-2">
								<hr className="border-0 border-b border-b-br max-md:border-r max-md:border-r-br max-md:h-full"/>
								<NavButton
									to="/db"
									Icon={BiArchive}
									title={t("buttons.nav.dashboard")}
									collapse={collapse}
								/>
								<NavButton
									to={() => {
										modal("", (onClose) => (
											<Edit
												onClose={(login?: string) => {	
													onClose && onClose();
												}}
												login={login}
												navigator={navigator}
											/>
										));
									}}
									Icon={BiCog}
									title={t("buttons.nav.settings")}
									collapse={collapse}
								/>
							</nav>
						)}
					</div>
					<button
						className="flex justify-center items-center aspect-square cursor-pointer p-0 w-full h-full max-w-12 max-h-12 hover:opacity-50 transition-all hover:bg-text/5 rounded-full"
						onClick={(e) => {
							if (token || loading) return;

							e.preventDefault();
							modal(Auth, () => <></>);
						}}
					>
						<Spin
							loading={loading}
							key={login}
						>
							{token ? (
								<User
									login={login}
									dataSource={{
										is_avatar,
										is_donut
									}}
									hideLogin
									size="small"
								/>
							) : (
								<BiLogIn className="w-full h-full px-3 pr-4" />
							)}
						</Spin>
					</button>
				</div>
			</aside>
		</div>
	);
}

export default Sider;
