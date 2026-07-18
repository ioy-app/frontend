import { configureStore } from "@reduxjs/toolkit";

import Login from "./login";

/**
 * Store
 * @description Redux store configured with login reducer
 * @returns Configured Redux store instance
 */
const Store = configureStore({
	reducer: {
		login: Login,
	},
});

/**
 * StoreProps
 * @description TypeScript type derived from the Redux store state
 */
export type StoreProps = ReturnType<typeof Store.getState>;
/**
 * Dispatch function for the Redux store
 * @description Sends actions to the Redux store to update state
 */
export const { dispatch } = Store;
export default Store;
