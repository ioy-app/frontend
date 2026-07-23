import { RouteObject } from "react-router-dom";
import Game from "./details";
import GameEdit from "./edit";

/**
 * gamesPaths
 * @description Route path constants for the games section
 * @returns Route path constants
 */
export const gamesPaths = {
	details: (id: number | string) => `/g/${id}`,
	edit: (id: number | string) => `/g/${id}/edit`,
	create: `/g/create`,
};

/**
 * games
 * @description Route definitions for the game pages
 * @returns Array of RouteObject configurations
 */
const games: RouteObject[] = [
	{
		path: gamesPaths.create,
		element: <GameEdit />,
	},
	{
		path: gamesPaths.details(":id"),
		element: <Game />,
	},
	{
		path: gamesPaths.edit(":id"),
		element: <GameEdit />,
	},
];

/**
 * Games routes
 * @description Default export of game route definitions
 * @returns Array of RouteObject configurations
 */
export default games;
