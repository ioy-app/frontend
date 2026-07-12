import * as Profile from "./profile";
import * as Sessions from "./sessions";
import * as Comments from "./comments";

import axios from "axios";
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
		answers: (id: number, commentid: number) =>
			`/comments/${id}/${commentid}`,
		create: (id: number) => `/comments/${id}`,
		reply: (id: number, commentid: number) =>
			`/comments/${id}/${commentid}`,
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
