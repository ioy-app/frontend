import {
	apiFileInstance,
	apiInstance
} from "@/api";
import jsonToFormData from "@/utils/jsonToFormData";

/**
 * Routes
 * @description API route paths for pictures endpoints
 * @returns Route path constants
 */
const Routes = {
	list: "/pictures",
	tags: "/pictures/tags",
	details: (id: number | string) => `/pictures/${id}`,
	like: (id: number | string) => `/pictures/${id}/like`,
	image: (id: number | string) => `/pictures/${id}/image`,
	votes: (id: number | string) => `/pictures/${id}/my-votes`
};

/**
 * Get pictures list
 *
 * @param params - Filters
 * @returns Promise with list of pictures
*/
export const pictures_list = (params?: Record<string, any> | URLSearchParams) =>
	apiInstance.get(Routes.list, { params });

/**
 * Get popular tags by pictures
 *
 * @returns Promise with list of popular tags
*/
export const pictures_tags = () =>
	apiInstance.get(Routes.tags);

/**
 * Get picture details by ID
 *
 * @param id - ID Picture
 * @returns Promise with picture details data
*/
export const pictures_details = (id: number) =>
	apiInstance.get(Routes.details(id));

/**
 * Delete picture by ID
 *
 * @param id - ID Picture
 * @returns Promise with deletion confirmation
*/
export const pictures_delete = (id: number) =>
	apiInstance.delete(Routes.details(id));

/**
 * Like/Dislike picture by ID
 *
 * @param id - ID Picture
 * @returns Promise with like status response
*/
export const pictures_like = (id: number) =>
	apiInstance.post(Routes.like(id));

/**
 * Picture's image
 *
 * @param id - ID Picture
 * @returns Promise with object URL for the picture image
*/
export const picture_image = async (id: number) =>
	URL.createObjectURL(await apiFileInstance.get(Routes.image(id), { responseType: "blob" }));

/**
 * Add new picture
 *
 * @param props - Picture properties
 * @returns Promise with created picture data
*/
export const pictures_create = (props: Record<string, any>) =>
	apiInstance.post(Routes.list, jsonToFormData(props));

/**
 * Edit picture info
 *
 * @param id - ID Picture
 * @param props - Picture properties
 * @returns Promise with updated picture data
*/
export const pictures_edit = (
	id: number,
	props: Record<string, any>
) =>
	apiInstance.put(Routes.details(id), jsonToFormData(props));

/**
 * Get user's votes by picture
 *
 * @param id - ID Picture
 * @returns Promise with list of user votes
*/
export const pictures_votes_list = (id: number) =>
	apiInstance.get(Routes.votes(id));

/**
 * Set jam's vote for picture
 *
 * @param id - ID Picture
 * @param nomination - Nomination title
 * @param score - Score (1, 2, 3)
 * @returns Promise with vote confirmation
*/
export const pictures_votes_put = (
	id: number,
	nomination: string,
	score: number
) =>
	apiInstance.put(Routes.votes(id), {
		nomination,
		score
	});
