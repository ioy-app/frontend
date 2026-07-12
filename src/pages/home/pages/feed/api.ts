import { apiInstance } from "@/api";

const Routes = {
	global: "/feed/global"
};

/**
 * Get feed's posts
 *
 * @param offset - Offset
 * @param limit - Limit
 * @returns
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
