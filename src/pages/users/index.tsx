import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UsersHeader from "./components/header";
import ErrorPage from "../error";
import { useTranslation } from "react-i18next";
import { users_details } from "./api";
import UsersContent from "./components/content";
import { Spin } from "@/components";
import { useMemo } from "react";

/**
 * Profile
 * @description User profile page with avatar, subscriber count, games, pictures, subscribers, and likes blocks
 * @returns JSX element with full user profile view
 */
export default function Profile() {
	const { t } = useTranslation();
	const params = useParams();
	const login = params?.login;

	const query = useQuery({
		queryKey: [ "users", login ],
		enabled: !!login,
		queryFn: () => users_details(login)
	});
	const subscribers = useMemo(() => query?.data?.subscribers || 0, [ query?.data ]);

	if (query?.isError)
		return (
			<ErrorPage
				msg={t("errors.users_exists")}
			/>
		);

	return (
		<Spin loading={query?.isLoading}>
			<div className="w-full px-4 pb-4 flex gap-4 flex-col items-center flex-1">
				<div className="flex flex-col gap-4 w-[60%] max-md:w-full items-center relative pt-4">
					<UsersHeader
						subscribers={subscribers}
					/>
				</div>
				<UsersContent />	
			</div>
		</Spin>
	);
}
