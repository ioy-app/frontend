import { Routes, apiInstance } from "@/api";

/**
 * Profile info
 * @description Retrieve the current user's profile information
 *
 * @returns Promise resolving to the authenticated user's profile data
 *
 * @example
 * await profile_me()
*/
export const profile_me = () =>
	apiInstance.get(Routes.profile.me);

/**
 * Profile logout
 * @description End the current user session by logging out
 *
 * @returns Promise resolving to a logout confirmation
 *
 * @example
 * await profile_logout()
*/
export const profile_logout = () =>
	apiInstance.get(Routes.profile.logout);
