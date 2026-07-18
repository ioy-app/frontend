import { Routes, apiInstance } from "@/api";

/**
 * Get all sessions by user
 * @description Retrieve a list of all active sessions for the current user
 *
 * @returns Promise resolving to an array of user sessions
 *
 * @example
 * await sessions_list()
*/
export const sessions_list = () =>
	apiInstance.get(Routes.sessions.list);

/**
 * Delete session by ID
 * @description Terminate a specific session by its identifier
 *
 * @param id - Unique identifier of the session to delete
 * @returns Promise resolving to a deletion confirmation
 *
 * @example
 * await sessions_delete(1)
*/
export const sessions_delete = (id: number) =>
	apiInstance.delete(Routes.sessions.details(id));

/**
 * Delete all sessions by user
 * @description Terminate all active sessions for the current user
 *
 * @returns Promise resolving to a deletion confirmation
 *
 * @example
 * await sessions_delete_all()
*/
export const sessions_delete_all = () =>
	apiInstance.delete(Routes.sessions.list);
