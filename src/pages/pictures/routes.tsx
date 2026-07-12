import { RouteObject } from "react-router-dom";
import PictureEdit from "./edit";
import PictureDetails from "./details";

export const pictures_paths = {
	details: (id: number | string) => `/p/${id}`,
	edit: (id: number | string) => `/p/${id}/edit`,
	create: `/p/create`,
};

const pictures: RouteObject[] = [
	{
		path: pictures_paths.create,
		element: <PictureEdit />,
	},
	{
		path: pictures_paths.details(":id"),
		element: <PictureDetails />,
	},
	{
		path: pictures_paths.edit(":id"),
		element: <PictureEdit />,
	},
];

export default pictures;
