import * as Profile from "./profile";
import * as Sessions from "./sessions";
import * as Comments from "./comments";

import axios from "axios";
/**
 * apiInstance
 * @description Axios instance configured with credentials, base URL, and interceptors for auth token handling and token refresh
 * @returns Configured axios instance
 */
export const apiInstance = axios.create({
	withCredentials: true,
	baseURL: "/api/v1",
});

apiInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token)
		config.headers.Authorization = `Bearer ${token}`;
	return config;
});

apiInstance.interceptors.response.use(
	(config) => config?.data,
	async (err) => {
		if (err.response.status == 401) {
			try {
				const response = await apiInstance.get(
					Routes.profile.refresh,
				);
				if (response?.token) {
					localStorage.setItem("token", response?.token);
					return apiInstance(err.config);
				}
			} catch (err) {
				localStorage.removeItem("token");
			} finally {
				return apiInstance(err.config);
			}
		}

		return Promise.reject({
			status: err?.response?.status || 0,
			message: err?.response?.data?.msg,
			data: err?.response?.data,
			originalError: err,
		});
	},
);

/**
 * apiFileInstance
 * @description Axios instance for file uploads with separate response interceptor that returns raw response data
 * @returns Configured axios instance for file operations
 */
export const apiFileInstance = apiInstance;
apiFileInstance.interceptors.response.use(
	(config) => config,
	async (err) => {
		if (err?.response?.status == 401) {
			try {
				const response = await apiInstance.get(
					Routes.profile.refresh,
				);
				if (response?.token) {
					localStorage.setItem("token", response?.token);
					return apiInstance(err.config);
				} else {
					localStorage.removeItem("token");
				}
			} catch (err) {
				console.log("???", err);
			}
		}

		return Promise.reject({
			status: err?.status || 0,
			message: err?.message,
			originalError: err,
		});
	},
);

/**
 * Routes
 * @description API route paths for core application endpoints
 * @returns Route path constants
 */
const Routes = {
	sessions: {
		list: `/sessions`,
		details: (id: number) => `/sessions/${id}`,
	},
	profile: {
		refresh: `/sessions/update`,
		me: `/auth/me`,
		logout: `/auth/logout`,
	},
	comments: {
		details: (id: number) => `/comments/${id}`,
		answers: (
			id: number,
			commentId: number
		) =>
			`/comments/${id}/${commentId}`,
		create: (id: number) => `/comments/${id}`,
		reply: (
			id: number,
			commentId: number
		) =>
			`/comments/${id}/${commentId}`,
		like: (id: number) => `/comments/${id}/like`,
	},
	search: `/search`,
	reports: {
		list: "/reports",
		details: (id: number) => `/reports/${id}`,
		ai: "/reports/ai"
	},
};

export {
	Profile,
	Sessions,
	Comments,
	Routes
};
