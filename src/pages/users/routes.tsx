import { RouteObject } from "react-router-dom";
import Profile from ".";

export const user_paths = {
	details: (login: string) => `/u/${login}`,
};

const user: RouteObject[] = [
	{
		path: user_paths.details(":login"),
		element: <Profile />,
	},
];

export default user;
