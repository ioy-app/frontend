import { Routes, apiInstance } from "@/api";

/**
 * Profile info
 *
 * @returns
*/
export const profile_me = () =>
	apiInstance.get(Routes.profile.me);

/**
 * Profile logout
 *
 * @returns
*/
export const profile_logout = () =>
	apiInstance.get(Routes.profile.logout);
