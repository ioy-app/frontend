import { Routes, apiInstance } from "@/api";

/**
 * Create new report by target
 * @description Submit a new report against a target entity
 *
 * @param targetId - Unique identifier of the entity being reported
 * @param type - Type of the entity being reported
 * @param message - Detailed message describing the report reason
 * @returns Promise resolving to the created report data
 *
 * @example
 * await reports_create(1, "game", "This game contains inappropriate content")
*/
export const reports_create = (
	targetId: number,
	type: "game" | "jam" | "picture" | "comment" | "user",
	message: string
) =>
	apiInstance.post(Routes.reports.list, {
		targetId,
		type,
		message
	});

/**
 * Get reports list (Only for Admin)
 * @description Retrieve a paginated list of all reports. Restricted to admin users.
 *
 * @param params - Query filters (e.g. pagination, sorting, status)
 * @returns Promise resolving to a list of reports
 *
 * @example
 * await reports_list({ page: 1, status: "pending" })
*/
export const reports_list = (params: Record<string, any>) =>
	apiInstance.get(Routes.reports.list, { params });

/**
 * Get ai report (Only for Admin)
 * @description Generate an AI-powered report analysis. Restricted to admin users. Has an extended timeout of 1 hour.
 *
 * @param params - Query parameters for the AI report generation
 * @returns Promise resolving to the AI-generated report data
 *
 * @example
 * await reports_ai({ targetId: 1, type: "game" })
*/
export const reports_ai = (params: Record<string, any>) =>
	apiInstance.post(Routes.reports.ai, {
		timeout: 1000 * 60 * 60 * 60,
		...params
	});

/**
 * Answer for report (Only for Admin)
 * @description Respond to a report with an answer and optional moderation actions. Restricted to admin users.
 *
 * @param reportId - Unique identifier of the report to answer
 * @param data - Answer content and optional moderation actions (ban, delete, unban)
 * @returns Promise resolving to the updated report data
 *
 * @example
 * await reports_answer(1, { answer: "Issue resolved", params: { ban_instance_3d: true } })
*/
export const reports_answer = (
	reportId: number,
	data: {
		answer: string,
		params: {
			ban_instance_3d?: boolean;
			ban_instance_30d?: boolean;
			delete_instance?: boolean;
			unban_instance?: boolean;
		}
	}
) =>
	apiInstance.put(Routes.reports.details(reportId), data);
