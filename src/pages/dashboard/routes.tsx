import { RouteObject } from "react-router-dom";
import Dashboard from ".";

/**
 * dashboardPaths
 * @description Route path constants for the dashboard section
 * @returns Route path constants
 */
export const dashboardPaths = {
	list: `/db`,
};

/**
 * dashboard
 * @description Route definitions for the dashboard pages
 * @returns Array of RouteObject configurations
 */
const dashboard: RouteObject[] = [
	{
		path: dashboardPaths.list,
		element: <Dashboard />
	},
	{
		path: `${dashboardPaths.list}/:tab`,
		element: <Dashboard />
	}
];

/**
 * Dashboard routes
 * @description Default export of dashboard route definitions
 * @returns Array of RouteObject configurations
 */
export default dashboard;
