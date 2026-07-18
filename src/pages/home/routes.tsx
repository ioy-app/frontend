import { RouteObject } from "react-router-dom";
import About from "./pages/about";
import Donut from "./pages/donut";
import Feed from "./pages/feed";
import Games from "@/pages/games";
import Jams from "@/pages/jams";
import Pictures from "@/pages/pictures";

/**
 * Home route paths
 * @description Paths for static pages (about, donut, terms)
 * @returns Route path constants
 */
export const homePaths = {
	about: "/about",
	donut: "/donut",
	terms: "/terms",
};

/**
 * home
 * @description Route definitions for the home section pages
 * @returns Array of RouteObject configurations
 */
const home: RouteObject[] = [
	{
		path: homePaths.about,
		element: <About />,
	},
	{
		path: homePaths.donut,
		element: <Donut />,
	},
];

/**
 * Home child routes
 * @description Nested route definitions for home page tabs (games, jams, feed, pictures)
 * @returns Array of RouteObject configurations
 */
export const homeChildren: RouteObject[] = [
	{
		index: true,
		element: <Games />
	},
	{
		path: "/jams",
		element: <Jams />
	},
	{
		path: "/feed",
		element: <Feed />
	},
	{
		path: "/pictures",
		element: <Pictures />
	}
];

/**
 * Home routes
 * @description Route definitions for static pages (about, donut)
 * @returns Array of RouteObject configurations
 */
export default home;
