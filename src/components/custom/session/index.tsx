import { Session as SessionProps } from "@/pages/users/api";
import dayjs from "dayjs";
import { UAParser } from "ua-parser-js";
import Button from "@/components/base/button";
import { useTranslation } from "react-i18next";

interface SessionLocalProps extends SessionProps {
	/** Событие нажатия на кнопку "Удалить" */
	onDelete?: (id: SessionProps["id"]) => void;
	/** Отключение активных кнопок */
	disabled?: boolean;
}

/**
 * Session
 * @description Displays a user session with browser info, IP, dates, and a delete button
 *
 * @param id - Session identifier
 * @param ip - IP address of the session
 * @param user_agent - Browser user agent string
 * @param date_created - Session creation date
 * @param date_expires - Session expiration date
 * @param onDelete - Callback triggered when the delete button is clicked
 * @param disabled - Disables the delete button
 * @returns A session card with browser/OS info, IP, dates, and delete action
 *
 * @example
 * <Session id={1} ip="127.0.0.1" user_agent="Mozilla/5.0" onDelete={(id) => handleDelete(id)} />
 */
const Session: React.FC<SessionLocalProps> = ({
	id,
	ip,
	user_agent,
	date_created,
	date_expires,
	onDelete,
	disabled,
}) => {
	const { t } = useTranslation();
	const parse = new UAParser(user_agent);
	const os = parse.getOS();
	const browser = parse.getBrowser();

	const dateCreatedText = date_created
		? dayjs(date_created)
				.locale("ru")
				.format("HH:mm DD.MM.YYYY")
		: t("undefined");
	const dateRangeText = date_expires
		? t("sessions.days", {
				count: dayjs(date_expires).diff(Date.now(), "days"),
			})
		: t("undefined");

	return (
		<div className="flex gap-4 text-default items-start justify-between">
			<div className="flex flex-col gap-1">
				<p>
					{browser.name} ({browser.version})
				</p>
				<p className="text-placeholder">
					{os.name} ({os.version})
				</p>
			</div>
			<div className="flex gap-4 items-start">
				<div>
					<p>{ip}</p>
					<p className="text-placeholder">
						{dateCreatedText}
					</p>
				</div>
				<p>{dateRangeText}</p>
				<Button
					variant="danger"
					onClick={() => onDelete(id)}
					disabled={disabled}
				>
					{t("buttons.delete")}
				</Button>
			</div>
		</div>
	);
};

export default Session;
