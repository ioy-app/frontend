import { RouteObject } from "react-router-dom";
import Jam from ".";
import JamDetails from "./details";
import JamEdit from "./edit";
import { GameEdit } from "@/pages";

/**
 * jamsPaths
 * @description Route path constants for the jams section
 * @returns Route path constants
 */
export const jamsPaths = {
	list: "/j",
	details: (id: number | string) => `/j/${id}`,
	edit: (id: number | string) => `/j/${id}/edit`,
	create: `/j/create`,
	create_game: (id: number | string) => `/j/${id}/create`
};

/**
 * jams
 * @description Route definitions for the jam pages
 * @returns Array of RouteObject configurations
 */
const jams: RouteObject[] = [
	{
		path: jamsPaths.create,
		element: <JamEdit />,
	},
	{
		path: jamsPaths.details(":id"),
		element: <JamDetails />,
	},
	{
		path: jamsPaths.edit(":id"),
		element: <JamEdit />,
	},
	{
		path: jamsPaths.create_game(":jam_id"),
		element: <GameEdit />
	}
];

/**
 * Jams routes
 * @description Default export of jam route definitions
 * @returns Array of RouteObject configurations
 */
export default jams;
