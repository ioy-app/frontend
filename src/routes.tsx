import { RouteObject } from "react-router-dom";
import { Home } from "@/pages";

import home, { home_paths, home_children } from "@/pages/home/routes";
import games, { games_paths } from "@/pages/games/routes";
import user, { user_paths } from "@/pages/users/routes";
import dashboard, { dashboard_paths } from "@/pages/dashboard/routes";
import jams, { jams_paths } from "@/pages/jams/routes";
import pictures, { pictures_paths } from "@/pages/pictures/routes";

export const paths = {
	users: user_paths,
	games: games_paths,
	dashboard: dashboard_paths,
	search: "/search",
	about: home_paths.about,
	donut: home_paths.donut,
	terms: home_paths.terms,
	verify: "/verify",
	jams: jams_paths,
	pictures: pictures_paths
};

const routes: RouteObject[] = [
	{
		path: "/",
		Component: Home,
		children: home_children
	},
	...home,
	...user,
	...games,
	...dashboard,
	...jams,
	...pictures
];

export default routes;
