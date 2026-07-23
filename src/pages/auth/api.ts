import { apiInstance } from "@/api";

/**
 * Routes
 * @description API route paths for authentication endpoints
 * @returns Route path constants
 */
const Routes = {
	login: `/auth/login`,
	reg: `/auth/reg`,
	verify: `/auth/verify`
};

/**
 * Login
 *
 * @param email - User's email
 * @returns Promise with login response data
*/
export const auth_login = (email: string) =>
	apiInstance.post(Routes.login, { email });

/**
 * Registration new user
 *
 * @param data - Creds for new user
 * @returns Promise with registration response data
*/
export const auth_register = (
	data: {
		login: string;
		email: string;
	}
) =>
	apiInstance.post(Routes.reg, data);

/**
 * Verify created account
 *
 * @param code - Verification code
 * @returns Promise with verification response data
*/
export const auth_verify = (code: string) =>
	apiInstance.get(Routes.verify, {
		params: {
			code
		}
	});
