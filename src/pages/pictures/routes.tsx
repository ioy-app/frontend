import { RouteObject } from "react-router-dom";
import PictureEdit from "./edit";
import PictureDetails from "./details";

/**
 * picturesPaths
 * @description Route path constants for the pictures section
 * @returns Route path constants
 */
export const picturesPaths = {
	details: (id: number | string) => `/p/${id}`,
	edit: (id: number | string) => `/p/${id}/edit`,
	create: `/p/create`,
};

/**
 * pictures
 * @description Route definitions for the picture pages
 * @returns Array of RouteObject configurations
 */
const pictures: RouteObject[] = [
	{
		path: picturesPaths.create,
		element: <PictureEdit />,
	},
	{
		path: picturesPaths.details(":id"),
		element: <PictureDetails />,
	},
	{
		path: picturesPaths.edit(":id"),
		element: <PictureEdit />,
	},
];

/**
 * Pictures routes
 * @description Default export of picture route definitions
 * @returns Array of RouteObject configurations
 */
export default pictures;
