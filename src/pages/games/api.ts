import {
	apiFileInstance,
	apiInstance
} from "@/api";
import jsonToFormData from "@/utils/jsonToFormData";
import UserProps from "@/pages/users/api";

export default interface GameProps {
	id: number;
	title: string;
	description: string;
	banner: string;
	author: UserProps;
	version?: string;
	tags: string[];
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
	list: `/games`,
	tags: "/games/tags",
	details: (id: number | string) => `/games/${id}`,
	icon: (id: number | string) => `/games/${id}/icon`,
	subscribe: (id: number | string) => `/games/${id}/subscribe`,
	game: (id: number | string) => `/games/${id}/game`,
	like: (id: number | string) => `/games/${id}/like`,
	create: `/games/create`,
	votes: (id: number | string) => `/games/${id}/my-votes`
};

/**
 * Get games list
 *
 * @param params - Filters
 * @returns
*/
export const games_list = (params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.list, { params });

/**
 * Get popular tags by games
 *
 * @returns
*/
export const games_tags = () =>
	apiInstance.get(Routes.tags);

/**
 * Get game details by ID
 *
 * @param id - ID Game
 * @returns
*/
export const games_details = (id: number) =>
	apiInstance.get(Routes.details(id));

/**
 * Delete game by ID
 *
 * @param id - ID Game
 * @returns
*/
export const games_delete = (id: number) =>
	apiInstance.delete(Routes.details(id));

/**
 * Like/Dislike game by ID
 *
 * @param id - ID Game
 * @returns
*/
export const games_like = (id: number) =>
	apiInstance.post(Routes.like(id));

/**
 * Get game icon
 *
 * @param id - ID Game
 * @returns
*/
export const games_icon = async (id: number) =>
	URL.createObjectURL(await apiFileInstance.get(Routes.icon(id), {
		responseType: "blob"
	}));

/**
 * Added new game
 *
 * @param props - Game properties
 * @returns
*/
export const games_create = (props: Record<string, any>) =>
	apiInstance.post(Routes.create, jsonToFormData(props));

/**
 * Edit game info
 *
 * @param id - ID Game
 * @param props - Game properties
 * @returns
*/
export const games_edit = (id: number, props: Record<string, any>) =>
	apiInstance.put(Routes.details(id), jsonToFormData(props));

/**
 * Get user's votes by game
 *
 * @param id - ID Game
 * @returns
*/
export const games_votes_list = (id: number) =>
	apiInstance.get(Routes.votes(id));

/**
 * Set jam's vote for game
 *
 * @param id - ID Game
 * @param nomination - Nomination title
 * @param score - Score (1, 2, 3)
 * @returns
*/
export const games_votes_put = (
	id: number,
	nomination: string,
	score: number
) =>
	apiInstance.put(Routes.votes(id), {
		nomination,
		score
	});
