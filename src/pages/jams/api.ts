import { apiInstance } from "@/api";
import jsonToFormData from "@/utils/jsonToFormData";
import UserProps from "@/pages/users/api";

/**
 * JamProps
 * @description Interface representing a jam entity with id, title, description, author, and status
 */
export default interface JamProps {
	id: number;
	title: string;
	description: string;
	author: UserProps;
	version?: string;
	status: "draft" | "public";
	comments?: {
		id: number;
		author: UserProps;
		content: string;
	}[];
	is_avatar?: boolean;
	date_created: Date;
	date_updated?: Date;
}

/**
 * Routes
 * @description API route paths for jams endpoints
 * @returns Route path constants
 */
const Routes = {
	list: `/jams`,
	details: (id: number | string) => `/jams/${id}`,
	icon: (id: number | string) => `/jams/${id}/icon`,
	join: (id: number | string) => `/jams/${id}/join`,
	leave: (id: number | string) => `/jams/${id}/leave`,
	games: (id: number | string) => `/jams/${id}/games`
};

/**
 * Get jams on range date
 *
 * @param date_from - From
 * @param date_to - To
 * @returns Promise with list of jams within date range
*/
export const jams_list = (
	dateFrom: string,
	dateTo: string
) =>
	apiInstance.get(Routes.list, {
		params: {
			date_from: dateFrom,
			date_to: dateTo
		}
	});

/**
 * Create new jam
 *
 * @param props - Jam properties
 * @returns Promise with created jam data
*/
export const jams_create = (props: Record<string, any>) =>
	apiInstance.post(Routes.list, jsonToFormData(props));

/**
 * Edit jam info
 *
 * @param id - ID Jam
 * @param props - Jam properties
 * @returns Promise with updated jam data
*/
export const jams_edit = (
	id: number,
	props: Record<string, any>
) =>
	apiInstance.put(Routes.details(id), jsonToFormData(props));

/**
 * Get jam details
 *
 * @param id - ID Jam
 * @returns Promise with jam details data
*/
export const jams_details = (id: number) =>
	apiInstance.get(Routes.details(id));

/**
 * Delete jam by ID
 *
 * @param id - ID Jam
 * @returns Promise with deletion confirmation
*/
export const jams_delete = (id: number) =>
	apiInstance.delete(Routes.details(id));

/**
 * Join to jam by ID
 *
 * @param id - ID Jam
 * @returns Promise with join confirmation
*/
export const jams_join = (id: number) =>
	apiInstance.post(Routes.join(id));

/**
 * Leave to jam by ID
 *
 * @param id - ID Jam
 * @returns Promise with leave confirmation
*/
export const jams_leave = (id: number) =>
	apiInstance.post(Routes.leave(id));

/**
 * Get games by jam
 *
 * @param id - ID Jam
 * @param params - Filters
 * @returns Promise with list of games in the jam
*/
export const jams_games = (
	id: number,
	params?: Record<string, any> | URLSearchParams
) =>
	apiInstance.get(Routes.games(id), { params });
