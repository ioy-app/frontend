import { apiInstance } from "@/api";

/**
 * Routes
 * @description API route paths for feed endpoints
 * @returns Route path constants
 */
const Routes = {
	global: "/feed/global"
};

/**
 * Get feed's posts
 *
 * @param offset - Offset
 * @param limit - Limit
 * @returns Response with feed posts
 *
 * @example
 * feed_global(0, 20)
*/
export const feed_global = (
	offset: number = 0,
	limit: number = 20
) =>
	apiInstance.get(Routes.global, {
		params: {
			offset,
			limit
		}
	});
