
/**
 * FEATURE_JAMS
 * @description Feature flag for jams functionality
 * @returns Boolean indicating whether the jams feature is enabled
 */
export const FEATURE_JAMS = Boolean(
	import.meta.env.VITE_FEATURE_JAMS == "true",
);
