import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enGlobal from "./en.json";
import ruGlobal from "./ru.json";
import enComponents from "@/components/i18n/en.json";
import ruComponents from "@/components/i18n/ru.json";
import enHome from "@/pages/home/i18n/en.json";
import ruHome from "@/pages/home/i18n/ru.json";
import enPictures from "@/pages/pictures/i18n/en.json";
import ruPictures from "@/pages/pictures/i18n/ru.json";
import enUsers from "@/pages/users/i18n/en.json";
import ruUsers from "@/pages/users/i18n/ru.json";
import enDashboard from "@/pages/dashboard/i18n/en.json";
import ruDashboard from "@/pages/dashboard/i18n/ru.json";
import enGames from "@/pages/games/i18n/en.json";
import ruGames from "@/pages/games/i18n/ru.json";
import enJams from "@/pages/jams/i18n/en.json";
import ruJams from "@/pages/jams/i18n/ru.json";
import enAuth from "@/pages/auth/i18n/en.json";
import ruAuth from "@/pages/auth/i18n/ru.json";

/**
 * en
 * @description English translation strings
 * @returns Merged English translation object from all feature modules
 */
const en = {
	...enGlobal,
	...enComponents,
	...enHome,
	...enPictures,
	...enUsers,
	...enDashboard,
	...enGames,
	...enJams,
	...enAuth
};
/**
 * ru
 * @description Russian translation strings
 * @returns Merged Russian translation object from all feature modules
 */
const ru = {
	...ruGlobal,
	...ruComponents,
	...ruHome,
	...ruPictures,
	...ruUsers,
	...ruDashboard,
	...ruGames,
	...ruJams,
	...ruAuth
};

/**
 * resources
 * @description i18n resource bundle mapping language codes to translation objects
 * @returns Resource bundle object with language codes as keys
 */
const resources = {
	en: { translation: en },
	ru: { translation: ru }
} as const;

i18n
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		lng: localStorage.getItem("lang") || "en",
		debug: process.env.NODE_ENV === "development",
		interpolation: {
			escapeValue: false,
		},
		detection: {
			lookupLocalStorage: "lang",
			convertDetectedLanguage: (lng) => lng?.split("-")?.at(0) || "en"
		},
		react: { useSuspense: false },
	});

export default i18n;
