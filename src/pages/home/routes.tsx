import { RouteObject } from "react-router-dom";
import About from "./pages/about";
import Donut from "./pages/donut";
import Games from "@/pages/games";
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
	{
		path: "/pictures",
		element: <Pictures />
	},
	{
		path: "/games",
		element: <Games />
	}
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
	}
];

/**
 * Home routes
 * @description Route definitions for static pages (about, donut)
 * @returns Array of RouteObject configurations
 */
export default home;
