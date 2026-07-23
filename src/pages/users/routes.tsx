import { RouteObject } from "react-router-dom";
import Profile from ".";

/**
 * userPaths
 * @description Route path constants for the users section
 * @returns Route path constants
 */
export const userPaths = {
	details: (login: string) => `/u/${login}`,
};

/**
 * user
 * @description Route definitions for the user profile pages
 * @returns Array of RouteObject configurations
 */
const user: RouteObject[] = [
	{
		path: userPaths.details(":login"),
		element: <Profile />,
	},
];

/**
 * User routes
 * @description Default export of user profile route definitions
 * @returns Array of RouteObject configurations
 */
export default user;
