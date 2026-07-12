import { RouteObject } from "react-router-dom";
import About from "./pages/about";
import Donut from "./pages/donut";
import Feed from "./pages/feed";
import Games from "@/pages/games";
import Jams from "@/pages/jams";
import Pictures from "@/pages/pictures";

export const home_paths = {
	about: "/about",
	donut: "/donut",
	terms: "/terms",
};

const home: RouteObject[] = [
	{
		path: home_paths.about,
		element: <About />,
	},
	{
		path: home_paths.donut,
		element: <Donut />,
	},
];

export const home_children: RouteObject[] = [
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

export default home;
