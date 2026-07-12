import { BiBox } from "react-icons/bi";
import { dashboard_likes } from "../api";
import * as Components from "@/components";
import dayjs from "dayjs";
import { NavLink, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { paths } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { StoreProps } from "@/stories";

const Likes: React.FC = () => {
	const { t } = useTranslation();
	const [searchParams, setSearchParams] = useSearchParams();
	const { login } = useSelector((state: StoreProps) => state.login);

	const max = 10;
	const current_page = Number(searchParams.get("page") || 1);
	const status = searchParams.get("status");
	const sort = searchParams.get("sort");
	const searchQS = searchParams.get("search");
	const type = searchParams.get("type");

	const query = useQuery({
		queryKey: [ "dashboard", "likes", searchParams?.toString() ],
		queryFn: async () => {
			const search = new URLSearchParams();

			search.set("offset", String((current_page - 1) * max));
			search.set("limit", String(max));
			if (sort) search.set("sort", sort);
			if (status) search.set("status", status);
			if (type) search.set("type", type);
			if (searchQS) search.set("search", searchQS);

			const result = await dashboard_likes(search);
			return result;
		},
	});

	return (
		<div className="w-full flex flex-col gap-4">
			<Components.Table
				columns={[
					{
						title: null,
						dataIndex: "id",
						render: (_, instance) => {
							switch(instance?.type) {
								case "game":
									return (
										<NavLink
											to={paths.games.details(instance?.id)}
											className="group flex items-center gap-2 w-fit"
										>
											<Components.Game
												dataSource={{
													id: instance?.id,
													is_avatar: instance?.is_avatar,
													jam_result: instance?.jam_result,
													hype: instance?.hype
												}}
												nolink
												size={12}
											/>
											<p className="text-default group-hover:text-primary transition-colors">{instance?.title}</p>
											{instance?.version && (
												<div className="text-default border border-text text-text group-hover:text-primary group-hover:border-primary px-4 py-1 rounded-2xl transition-colors">
													{instance?.version}
												</div>
											)}
										</NavLink>
									);
								break;
								case "picture":
									return (
										<NavLink
											to={paths.pictures.details(instance?.id)}
											className="group flex items-center gap-2 w-fit"
										>
											<div className="flex justify-center items-center w-12 aspect-square">
												<Components.Picture
													dataSource={{
														id: instance?.id,
														jam_result: instance?.jam_result,
														hype: instance?.hype
													}}
													nolink
													size="full"
												/>
											</div>
											<p className="text-default group-hover:text-primary transition-colors">{instance?.title}</p>
										</NavLink>
									);
								break;
							}
						}
					},
					{
						title: t("dashboard.table.instances.author"),
						dataIndex: "creater_data",
						render: (data, instance) => (
							<Components.User
								login={data.login}
								dataSource={data}
								size="small"
							/>
						)
					},
					{
						title: t("dashboard.table.instances.date_created"),
						dataIndex: "date_created",
						render: (date) =>
							dayjs(date)?.isValid() &&
							dayjs(date).format("HH:mm DD.MM.YYYY"),
					},
					{
						title: t("dashboard.table.instances.date_updated"),
						dataIndex: "date_updated",
						render: (date) =>
							dayjs(date)?.isValid() &&
							dayjs(date).format("HH:mm DD.MM.YYYY"),
					},
					{
						title: t("dashboard.table.instances.like_created"),
						dataIndex: "like_created",
						render: (date) =>
							dayjs(date)?.isValid() &&
							dayjs(date).format("HH:mm DD.MM.YYYY"),
					},
				]}
				data={query?.data?.items}
				loading={query?.isPending}
				footer={
					<Components.Pagination
						total={query?.data?.total || 1}
						current={current_page}
						per_page={max}
						onChange={(_, page) => {
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

export default Likes;
