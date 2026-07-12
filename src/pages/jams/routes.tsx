import { RouteObject } from "react-router-dom";
import Jam from ".";
import JamDetails from "./details";
import JamEdit from "./edit";
import { GameEdit } from "@/pages";

export const jams_paths = {
	list: "/j",
	details: (id: number | string) => `/j/${id}`,
	edit: (id: number | string) => `/j/${id}/edit`,
	create: `/j/create`,
	create_game: (id: number | string) => `/j/${id}/create`
};

const jams: RouteObject[] = [
	{
		path: jams_paths.create,
		element: <JamEdit />,
	},
	{
		path: jams_paths.details(":id"),
		element: <JamDetails />,
	},
	{
		path: jams_paths.edit(":id"),
		element: <JamEdit />,
	},
	{
		path: jams_paths.create_game(":jam_id"),
		element: <GameEdit />
	}
];

export default jams;
