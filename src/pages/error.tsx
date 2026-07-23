import * as Icons from "@/icons";
import { Button } from "@/components";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * ErrorPage
 * @description Displays a styled error page with an optional custom message and a link to the main page
 *
 * @param msg - Optional translation key for the error message
 * @returns JSX element with error display and navigation button
 */
export default function ErrorPage({
	msg
}: {
	msg?: string;
}) {
	const { t } = useTranslation();

	return (
		<div className="flex-1 w-full h-screen flex justify-center items-center flex-col gap-4 bg-back text-text">
			<img src={Icons.Empty} className="h-25" />
			<p className="text-title">{t("errors.title")}</p>
			<p className="text-default">
				{msg ? t(msg) : t("errors.unknown")}
			</p>
			<NavLink to="/">
				<Button variant="primary">
					{t("buttons.main")}
				</Button>
			</NavLink>
		</div>
	);
}
