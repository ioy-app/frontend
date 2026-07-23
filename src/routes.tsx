import { RouteObject } from "react-router-dom";
import { Home } from "@/pages";

import home, { homePaths, homeChildren } from "@/pages/home/routes";
import games, { gamesPaths } from "@/pages/games/routes";
import user, { userPaths } from "@/pages/users/routes";
import dashboard, { dashboardPaths } from "@/pages/dashboard/routes";
import jams, { jamsPaths } from "@/pages/jams/routes";
import pictures, { picturesPaths } from "@/pages/pictures/routes";

/**
 * paths
 * @description Aggregated route path constants for all application sections
 * @returns Object containing route path constants for all sections
 */
export const paths = {
	users: userPaths,
	games: gamesPaths,
	dashboard: dashboardPaths,
	search: "/search",
	about: homePaths.about,
	donut: homePaths.donut,
	terms: homePaths.terms,
	verify: "/verify",
	jams: jamsPaths,
	pictures: picturesPaths
};

const routes: RouteObject[] = [
	{
		path: "/",
		Component: Home,
		children: homeChildren
	},
	...home,
	...user,
	...games,
	...dashboard,
	...jams,
	...pictures
];

/**
 * Application routes
 * @description Aggregated route definitions for all application sections
 * @returns Array of RouteObject configurations
 */
export default routes;
