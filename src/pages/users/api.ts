import { apiInstance } from "@/api";
import jsonToFormData from "@/utils/jsonToFormData";

type ControlsProps = {
	is_subscribe: boolean;
	is_me: boolean;
}

export default interface UserProps {
	id: number;
	login: string;
	description?: string;
	subscribers: number;
	date_ban?: Date;
	date_deleted?: Date;
	ban_count: number;
	controls?: ControlsProps;
}

export interface Session {
	/** ID */
	id: number;
	/** IP адрес сессии */
	ip: string;
	/** Браузер, версия ОС */
	user_agent: string;
	/** Дата создания */
	date_created: string;
	/** Дата завершения */
	date_expires: string;
	/** Токен доступа */
	token?: string;
}

const Routes = {
	self: `/users/self`,
	details: (login: string) => `/users/${login}`,
	subscribe: (login: string) =>
		`/users/${login}/subscribe`,
	games: (login: string) => `/users/${login}/games`,
	pictures: (login: string) => `/users/${login}/pictures`,
	jams: (login: string) => `/users/${login}/jams`,
	avatar: (login: string) => `/users/${login}/avatar`,
	subscribers: (login: string) =>
		`/users/${login}/subscribers`,
	favorites: (login: string) =>
		`/users/${login}/favorites`,
	likes: (login: string) => `/users/${login}/likes`,
	email: `/users/change-email`,
	delete: `/users/delete`,
};

/**
 * Get user's details
 *
 * @param login - Login
 * @returns
*/
export const users_details = (login: string) =>
	apiInstance.get(Routes.details(login));

/**
 * Get self details
 *
 * @returns
*/
export const users_me = () =>
	apiInstance.get(Routes.self);

/**
 * Subscribe to user
 *
 * @param login - Login
 * @returns
*/
export const users_subscribe = (login: string) =>
	apiInstance.post(Routes.subscribe(login));

/**
 * Get games by user
 *
 * @param login - Login
 * @param params - Filters
 * @returns
*/
export const users_games = (login: string, params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.games(login), {
		params
	});

/**
 * Get pictures by user
 *
 * @param login - Login
 * @param params - Filters
 * @returns
*/
export const users_pictures = (login: string, params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.pictures(login), {
		params
	});

/**
 * Get likes instances by user
 *
 * @param login - Login
 * @param params - Filters
 * @returns
*/
export const users_likes = (login: string, params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.likes(login), {
		params
	});

/**
 * Get following by user
 *
 * @param login - Login
 * @param params - Filters
 * @returns
*/
export const users_following = (login: string, params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.subscribers(login), {
		params
	});

/**
 * Get jams by user
 *
 * @param login - Login
 * @param params - Filters
 * @returns
*/
export const users_jams = (login: string, params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.jams(login), {
		params
	});

/**
 * Edit user info
 *
 * @param login - Login
 * @param props - Properties
 * @returns
*/
export const users_edit = (login: string, props: Record<string, any>) =>
	apiInstance.put(Routes.details(login), jsonToFormData(props));

/**
 * Change user's email
 *
 * @param current_email - Current email
 * @param new_email - New email
 * @returns
*/
export const users_edit_email = (current_email: string, new_email: string) =>
	apiInstance.put(Routes.email, {
		current_email,
		email: new_email
	});

/**
 * Delete user's account
 *
 * @returns
*/
export const users_delete = () =>
	apiInstance.post(Routes.delete);
