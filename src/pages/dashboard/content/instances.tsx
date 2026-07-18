import {
	BiBox,
	BiComment,
	BiHeart,
	BiPlus
} from "react-icons/bi";
import { dashboard_instances } from "../api";
import * as Components from "@/components";
import dayjs from "dayjs";
import { NavLink, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gamesPaths } from "@/pages/games/routes";
import { paths } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { picturesPaths } from "@/pages/pictures/routes";

/**
 * Games
 * @description Dashboard tab displaying games and pictures instances with filtering, sorting, and pagination
 * @returns JSX element with instances table
 */
const Games: React.FC = () => {
	const { t } = useTranslation();
	const [searchParams, setSearchParams] = useSearchParams();

	const max = 10;
	const currentPage = Number(searchParams.get("page") || 1);
	const status = searchParams.get("status");
	const sort = searchParams.get("sort");
	const searchQS = searchParams.get("search");
	const type = searchParams.get("type");

	const query = useQuery({
		queryKey: [ "dashboard", "instances", searchParams?.toString() ],
		queryFn: async () => {
			const search = new URLSearchParams();

			search.set("offset", String((currentPage - 1) * max));
			search.set("limit", String(max));
			if (sort) search.set("sort", sort);
			if (status) search.set("status", status);
			if (type) search.set("type", type);
			if (searchQS) search.set("search", searchQS);

			const result = await dashboard_instances(search);
			return result;
		},
	});

	return (
		<div className="w-full flex flex-col gap-4">
			<Components.Table
				columns={[
					{
						title: "",
						dataIndex: "id",
						render: (
						_,
						instance
					) => {
							switch(instance?.type) {
								case "game":
									return (
										<NavLink
											to={paths.games.edit(instance?.id)}
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
											to={paths.pictures.edit(instance?.id)}
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
						title: t("dashboard.table.instances.status"),
						dataIndex: "status",
						render: (status) =>
							t(`dashboard.statuses.` + status),
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
						title: <BiHeart />,
						dataIndex: "likes",
					},
					{
						title: <BiComment />,
						dataIndex: "comments",
					}
				]}
				data={query?.data?.items}
				loading={query?.isPending}
				header={
					<div className="w-full flex items-center justify-end gap-4">
						<NavLink to={gamesPaths.create}>
							<Components.Button
								variant="primary"
							>
								{t("buttons.add_game")}
								<BiPlus />
							</Components.Button>
						</NavLink>
						<NavLink to={picturesPaths.create}>
							<Components.Button
								variant="primary"
							>
								{t("buttons.add_picture")}
								<BiPlus />
							</Components.Button>
						</NavLink>
					</div>
				}
				footer={
					<Components.Pagination
						total={query?.data?.total || 1}
						current={currentPage}
						perPage={max}
						onChange={(
						_,
						page
					) => {
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

export default Games;
