import { apiInstance } from "@/api";

/**
 * Routes
 * @description API route paths for dashboard endpoints
 * @returns Route path constants
 */
const Routes = {
	instances: "/auth/dashboard/instances",
	games: `/games/my`,
	jams: `/jams/my`,
	pictures: `/pictures/my`,
	likes: "/auth/dashboard/likes"
};

/**
 * Dashboard's instances list
 *
 * @param params - Filters
 * @returns Promise with list of dashboard instances
*/
export const dashboard_instances = (params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.instances, { params });

/**
 * Dashboard's jams list
 *
 * @param params - Filters
 * @returns Promise with list of dashboard jams
*/
export const dashboard_jams = (params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.jams, { params });

/**
 * Dashboard's likes list
 *
 * @param params - Filters
 * @returns Promise with list of dashboard likes
*/
export const dashboard_likes = (params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.likes, { params });

/**
 * Dashboard's pictures list
 *
 * @param params - Filters
 * @returns Promise with list of dashboard pictures
*/
export const dashboard_pictures = (params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.pictures, { params });
