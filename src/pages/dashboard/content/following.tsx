import { BiBox } from "react-icons/bi";
import { users_following } from "@/pages/users/api";
import { useSelector } from "react-redux";
import { StoreProps } from "@/stories";
import * as Components from "@/components";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { paths } from "@/routes";
import { useQuery } from "@tanstack/react-query";

const Following: React.FC = () => {
	const { t } = useTranslation();
	const [searchParams, setSearchParams] = useSearchParams();
	const { login } = useSelector((state: StoreProps) => state.login);
	const max = 10;
	const current_page = Number(searchParams.get("page") || 1);
	const sort = searchParams.get("sort");

	const query = useQuery({
		queryKey: [ "dashboard", "following", searchParams?.toString?.(), login ],
		queryFn: async () => {
			const search = new URLSearchParams();
			search.set(
				"offset",
				String((current_page - 1) * max),
			);
			search.set("limit", String(max));
			if (sort) search.set("sort", sort);

			const result = await users_following(login, search);
			return result;
		},
	});

	return (
		<div className="w-full flex flex-col gap-4">
			<Components.Table
				columns={[
					{
						title: t("dashboard.table.following.user"),
						dataIndex: "id",
						render: (_, user) => (
							<Link
								to={paths.users.details(user?.login)}
								className="group flex items-center gap-2 w-fit"
							>
								<Components.User
									dataSource={{
										id: user?.id,
										is_avatar: user?.is_avatar,
										is_donut: user?.is_donut
									}}
									login={user?.login}
									nolink
									size="small"
								/>
							</Link>
						),
					},
				]}
				data={query?.data?.items}
				loading={query?.isPending}
				footer={
					<Components.Pagination
						total={query?.data?.total || 1}
						current={current_page}
						per_page={max}
						onChange={(offset, page) => {
							searchParams.set("page", String(page));
							setSearchParams(searchParams);
							query.refetch();
						}}
					/>
				}
				nodata={
					<>
						<BiBox className="text-2xl" />
						<p className="text-placeholder">
							{t("dashboard.labels.nodata")}
						</p>
					</>
				}
			/>
		</div>
	);
};

export default Following;
