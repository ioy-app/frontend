import { BiBox, BiPlus } from "react-icons/bi";
import { dashboard_jams } from "../api";
import * as Components from "@/components";
import dayjs from "dayjs";
import {
	Link,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { paths } from "@/routes";
import GameProps from "@/pages/games/api";
import { useQuery } from "@tanstack/react-query";
import { jamsPaths } from "@/pages/jams/routes";
import { useMemo } from "react";

/**
 * Jams
 * @description Dashboard tab displaying jams with date ranges, sorting, and pagination
 * @returns JSX element with jams table
 */
const Jams: React.FC = () => {
	const { t } = useTranslation();
	const navigator = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const max = 10;
	const currentPage = Number(searchParams.get("page") || 1);
	const sort = searchParams.get("sort");
	const jams = searchParams.get("jams");
	const searchQS = searchParams.get("search");

	const query = useQuery({
		queryKey: [ "dashboard", "jams", searchParams?.toString() ],
		queryFn: async () => {
			const search = new URLSearchParams();

			search.set("offset", String((currentPage - 1) * max));
			search.set("limit", String(max));
			if (sort) search.set("sort", sort);
			if (jams) search.set("jams", jams);
			if (searchQS) search.set("search", searchQS);

			const result = await dashboard_jams(search);
			return result;
		},
	});

	const dataSource = useMemo(() => query?.data?.items || [], [ query?.data ]);

	return (
		<div className="w-full flex flex-col gap-4">
			<Components.Table
				columns={[
					{
						title: t("dashboard.table.jams.jam"),
						dataIndex: "id",
						render: (
							data,
							jam
						) => (
							<Link
								to={paths.jams.details(jam?.id)}
								className="group flex items-center gap-2 w-fit"
							>
								<Components.Jam
									dataSource={
										{
											id: jam?.id,
											is_avatar: jam?.is_avatar,
										} as GameProps
									}
									nolink
									size={12}
								/>
								<p className="text-default group-hover:text-primary transition-colors cursor-pointer">
									{jam?.title}
								</p>
							</Link>
						),
					},
					{
						title: t(
							"dashboard.table.jams.started_to_finished",
						),
						dataIndex: "date_created",
						render: (
							_,
							row
						) => (
							<div className="flex items-center gap-1 text-default">
								<p>{dayjs(row.date_started)?.isValid() && dayjs(row.date_started).format("HH:mm DD.MM.YYYY")}</p>
								<p>—</p>
								<p>{dayjs(row.date_finished)?.isValid() && dayjs(row.date_finished).format("HH:mm DD.MM.YYYY")}</p>
							</div>
						)
					},
					{
						title: t(
							"dashboard.table.jams.vote_started_to_finished",
						),
						dataIndex: "date_vote_started",
						render: (
							_,
							row
						) => (
							<div className="flex items-center gap-1 text-default">
								<p>{dayjs(row.date_vote_started)?.isValid() && dayjs(row.date_vote_started).format("HH:mm DD.MM.YYYY")}</p>
								<p>—</p>
								<p>{dayjs(row.date_vote_finished)?.isValid() && dayjs(row.date_vote_finished).format("HH:mm DD.MM.YYYY")}</p>
							</div>
						)
					},
				]}
				data={dataSource}
				loading={query?.isPending}
				header={
					<div className="w-full flex items-center justify-end gap-4">
						<Components.Button
							variant="primary"
							onClick={() => navigator(jamsPaths.create)}
						>
							{t("buttons.add_jam")}
							<BiPlus />
						</Components.Button>
					</div>
				}
				footer={
					<Components.Pagination
						total={query?.data?.total || 1}
						current={currentPage}
						perPage={max}
						onChange={(
						offset,
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

export default Jams;
