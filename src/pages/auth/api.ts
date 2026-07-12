import { apiInstance } from "@/api";

const Routes = {
	login: `/auth/login`,
	reg: `/auth/reg`,
	verify: `/auth/verify`
};

/**
 * Login
 *
 * @param email - User's email
 * @returns
*/
export const auth_login = (email: string) =>
	apiInstance.post(Routes.login, { email });

/**
 * Registration new user
 *
 * @param data - Creds for new user
 * @returns
*/
export const auth_reg = (
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
 * @returns
*/
export const auth_verify = (code: string) =>
	apiInstance.get(Routes.verify, {
		params: {
			code
		}
	});
