import imgLabel from "@/icons/label.svg";
import imgLogo from "@/icons/logo.svg";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import Button from "../../base/button";
import { paths } from "@/routes";
import { BiAlignLeft, BiCalendar, BiDetail, BiDonateHeart, BiGlobe, BiImage, BiInfoCircle, BiJoystick, BiLogIn, BiMoon, BiSun, BiUser } from "react-icons/bi";
import Spin from "../../base/spin";
import Popup from "../../base/popup";
import User from "../../content/user";
import { Auth } from "@/pages";
import { useModal } from "@/hooks";
import { useSelector } from "react-redux";
import i18n from "@/i18n";
import { useState } from "react";

/**
 * Sider
 * @example
 * return <Sider />
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
      <aside className={`sticky top-0 left-0 max-md:bottom-0 max-md:top-auto h-screen max-md:w-screen max-md:h-20 box-border px-4 py-2 ${collapse ? "w-28" : "min-w-50"} z-11`}>
        <div className="flex flex-col items-center gap-4 border border-br rounded-full h-full p-2 bg-back max-md:flex-row">
          <NavLink
            to={paths.about}
            className="flex justify-center items-center"
          >
            <div className="flex justify-center items-center max-w-12 max-h-16 w-full h-full">
              <img src={collapse? imgLogo : imgLabel} className="flex justify-center items-center p-1 w-full aspect-square h-full z-1 pointer-events-none select-none" />
            </div>
          </NavLink>
          <div className="h-full flex flex-col max-md:flex-row gap-4 overflow-y-auto max-md:overflow-x-auto no-scrollbar">
            <nav className="flex flex-col max-md:flex-row gap-4 flex-1">
              <NavLink
                to="/feed"
                className="hover:bg-text/5 rounded-2xl transition-colors flex justify-center items-center"
              >
                {({ isActive }) => (
                  <Button
                    variant="clear"
                    className={`w-full justify-start ${isActive ? "text-primary bg-text/3" : "text-text"}`}
                  >
                    <BiDetail />
                    {!collapse && t("buttons.nav.feed")}
                  </Button>
                )}
              </NavLink>
              <hr
                className="border-0 border-b border-b-br max-md:hidden"
              />
              <NavLink
                to="/"
                className="hover:bg-text/5 rounded-2xl transition-colors flex justify-center items-center"
              >
                {({ isActive }) => (
                  <Button
                    variant="clear"
                    className={`w-full justify-start ${isActive ? "text-primary bg-text/3" : "text-text"}`}
                  >
                    <BiJoystick />
                    {!collapse && t("buttons.nav.games")}
                  </Button>
                )}
              </NavLink>
              <NavLink
                to="/pictures"
                className="hover:bg-text/5 rounded-2xl transition-colors flex justify-center items-center"
              >
                {({ isActive }) => (
                  <Button
                    variant="clear"
                    className={`w-full justify-start ${isActive ? "text-primary bg-text/3" : "text-text"}`}
                  >
                    <BiImage />
                    {!collapse && t("buttons.nav.pictures")}
                  </Button>
                )}
              </NavLink>
              <NavLink
                to="/jams"
                className="hover:bg-text/5 rounded-2xl transition-colors flex justify-center items-center"
              >
                {({ isActive }) => (
                  <Button
                    variant="clear"
                    className={`w-full justify-start ${isActive ? "text-primary bg-text/3" : "text-text"}`}
                  >
                    <BiCalendar />
                    {!collapse && t("buttons.nav.jams")}
                  </Button>
                )}
              </NavLink>
              <hr
                className="border-0 border-b border-b-br max-md:hidden"
              />
              <NavLink
                to={paths.donut}
                className="hover:bg-text/5 rounded-2xl transition-colors flex justify-center items-center"
              >
                {({ isActive }) => (
                  <Button
                    variant="clear"
                    className={`w-full justify-start ${isActive ? "text-primary bg-text/3" : "text-text"}`}
                  >
                    <BiDonateHeart />
                    {!collapse && t("footer.donut")}
                  </Button>
                )}
              </NavLink>
            </nav>
            <Button
              variant="text"
              onClick={() => toggleDarkMode()}
              className="hover:bg-text/5 rounded-2xl transition-colors flex justify-center items-center max-md:h-full px-4"
            >
              {darkMode != "dark" ? <BiSun /> : <BiMoon />}
            </Button>
            <label className="flex items-center justify-center relative w-full h-10 max-md:h-full aspect-square p-2 hover:opacity-50 transition-all hover:bg-text/5 rounded-2xl">
              <BiGlobe className="w-full h-full max-md:p-1" />
              <select
                onChange={(e) => handleChangeLanguage(e)}
                value={i18n.language}
                className="outline-0 dark:scheme-dark appearance-none opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </label>
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