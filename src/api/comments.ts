import { Routes, apiInstance } from "@/api";
import UserProps from "@/pages/users/api";

/**
 * CommentProps
 * @description Interface representing a comment entity with author, content, and nested replies
 */
export interface CommentProps {
	id: number;
	comment: string | null;
	source_id?: number;
	target_id: number;
	target_type: "game" | "comment";
	date_created?: string;
	date_updated?: string;
	author: UserProps;
	answers_total?: number;
	deleted?: boolean;
	answers?: CommentProps[];
	likes?: number;
	is_like?: boolean;
	is_me?: boolean;
}

/**
 * Get comment by instance
 * @description Retrieve a list of comments for a target instance (e.g. game or picture)
 *
 * @param id - Unique identifier of the target instance
 * @param params - Query filters (e.g. pagination, sorting)
 * @returns Promise resolving to a list of comments
 *
 * @example
 * await comments_list(1, { page: 1 })
*/
export const comments_list = (
	id: number,
	params: Record<string, any>
) =>
	apiInstance.get(Routes.comments.details(id), { params });

/**
 * Get answers by comment
 * @description Retrieve a list of replies to a specific comment
 *
 * @param id - Unique identifier of the target instance
 * @param commentId - Unique identifier of the parent comment
 * @param params - Query filters (e.g. pagination, sorting)
 * @returns Promise resolving to a list of comment replies
 *
 * @example
 * await comments_answers(1, 42, { page: 1 })
*/
export const comments_answers = (
	id: number,
	commentId: number,
	params: Record<string, any>
) =>
	apiInstance.get(Routes.comments.answers(id, commentId), { params });

/**
 * Set Like/Dislike to comment
 * @description Toggle like or dislike on a specific comment
 *
 * @param id - Unique identifier of the comment
 * @returns Promise resolving to the updated like status
 *
 * @example
 * await comments_like(42)
*/
export const comments_like = (id: number) =>
	apiInstance.post(Routes.comments.like(id));

/**
 * Create new comment for instance
 * @description Post a new comment on a target instance (e.g. game or picture)
 *
 * @param id - Unique identifier of the target instance
 * @param comment - The comment text content
 * @param type - Type of the target instance ("game" or "picture")
 * @returns Promise resolving to the created comment data
 *
 * @example
 * await comments_create(1, "Great game!", "game")
*/
export const comments_create = (
	id: number,
	comment: string,
	type: "game" | "picture"
) =>
	apiInstance.post(Routes.comments.create(id), {
		comment,
		type
	});

/**
 * Reply to instance
 * @description Post a reply to an existing comment
 *
 * @param id - Unique identifier of the target instance
 * @param commentId - Unique identifier of the parent comment to reply to
 * @param comment - The reply text content
 * @returns Promise resolving to the created reply data
 *
 * @example
 * await comments_reply(1, 42, "I agree!")
*/
export const comments_reply = (
	id: number,
	commentId: number,
	comment: string
) =>
	apiInstance.post(Routes.comments.reply(id, commentId), {
		comment
	});

/**
 * Delete comment
 * @description Remove a specific comment by its identifier
 *
 * @param id - Unique identifier of the target instance
 * @param commentId - Unique identifier of the comment to delete
 * @returns Promise resolving to a deletion confirmation
 *
 * @example
 * await comments_delete(1, 42)
*/
export const comments_delete = (
	id: number,
	commentId: number
) =>
	apiInstance.delete(Routes.comments.reply(id, commentId));
