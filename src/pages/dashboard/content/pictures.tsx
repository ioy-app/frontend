import {
	BiBox,
	BiComment,
	BiEditAlt,
	BiHeart,
	BiPlus
} from "react-icons/bi";
import { dashboard_pictures } from "@/api/dashboard";
import * as Components from "@/components";
import dayjs from "dayjs";
import {
	Link,
	useNavigate,
	useSearchParams
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { paths } from "@/routes";
import GameProps from "@/types/game";
import { useQuery } from "@tanstack/react-query";
import { pictures_paths } from "@/routes/pictures";

const Pictures: React.FC = () => {
	const { t } = useTranslation();
	const navigator = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const max = 10;
	const current_page = Number(searchParams.get("page") || 1);
	const status = searchParams.get("status");
	const sort = searchParams.get("sort");
	const searchQS = searchParams.get("search");

	const query = useQuery({
		queryKey: [ "dashboard", "pictures", searchParams?.toString() ],
		queryFn: async () => {
			const search = new URLSearchParams();

			search.set("offset", String((current_page - 1) * max));
			search.set("limit", String(max));
			if (sort) search.set("sort", sort);
			if (status) search.set("status", status);
			if (searchQS) search.set("search", searchQS);

			const result = await dashboard_pictures(search);
			return result;
		},
	});

	return (
		<div className="w-full flex flex-col gap-4">
			<Components.Table
				columns={[
					{
						title: t("dashboard.table.pictures.picture"),
						dataIndex: "id",
						render: (data, game) => (
							<Link
								to={paths.pictures.details(game?.id)}
								className="group flex items-center gap-2 w-50"
							>
								<Components.Picture
									dataSource={
										{
											id: game?.id,
											jam_result: game?.jam_result
										} as GameProps
									}
									nolink
									size={12}
								/>
								<p className="text-default group-hover:text-primary transition-colors cursor-pointer">
									{game?.title}
								</p>
							</Link>
						),
					},
					{
						title: t("dashboard.table.pictures.status"),
						dataIndex: "status",
						render: (status) =>
							t(`dashboard.statuses.` + status),
					},
					{
						title: t("dashboard.table.pictures.date_created"),
						dataIndex: "date_created",
						render: (date) =>
							dayjs(date)?.isValid() &&
							dayjs(date).format("HH:mm DD.MM.YYYY"),
					},
					{
						title: t("dashboard.table.pictures.date_updated"),
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
				control={(row, i) => (
					<>
						<Components.Button
							variant="second"
							onClick={() =>
								navigator(pictures_paths.edit(row?.id))
							}
						>
							<BiEditAlt />
						</Components.Button>
					</>
				)}
				header={
					<div className="w-full flex items-center justify-end gap-4">
						<Components.Button
							variant="primary"
							onClick={() => navigator(pictures_paths.create)}
						>
							<BiPlus />
							{t("buttons.add")}
						</Components.Button>
					</div>
				}
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

export default Pictures;
