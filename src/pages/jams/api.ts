import { apiInstance } from "@/api";
import jsonToFormData from "@/utils/jsonToFormData";
import UserProps from "@/pages/users/api";

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
 * @returns
*/
export const jams_list = (date_from: string, date_to: string) =>
	apiInstance.get(Routes.list, {
		params: {
			date_from,
			date_to
		}
	});

/**
 * Create new jam
 *
 * @param props - Jam properties
 * @returns
*/
export const jams_create = (props: Record<string, any>) =>
	apiInstance.post(Routes.list, jsonToFormData(props));

/**
 * Edit jam info
 *
 * @param id - ID Jam
 * @param props - Jam properties
 * @returns
*/
export const jams_edit = (id: number, props: Record<string, any>) =>
	apiInstance.put(Routes.details(id), jsonToFormData(props));

/**
 * Get jam details
 *
 * @param id - ID Jam
 * @returns
*/
export const jams_details = (id: number) =>
	apiInstance.get(Routes.details(id));

/**
 * Delete jam by ID
 *
 * @param id - ID Jam
 * @returns
*/
export const jams_delete = (id: number) =>
	apiInstance.delete(Routes.details(id));

/**
 * Join to jam by ID
 *
 * @param id - ID Jam
 * @returns
*/
export const jams_join = (id: number) =>
	apiInstance.post(Routes.join(id));

/**
 * Leave to jam by ID
 *
 * @param id - ID Jam
 * @returns
*/
export const jams_leave = (id: number) =>
	apiInstance.post(Routes.leave(id));

/**
 * Get games by jam
 *
 * @param id - ID Jam
 * @param params - Filters
 * @returns
*/
export const jams_games = (id: number, params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.games(id), { params });
