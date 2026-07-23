import { useQuery } from "@tanstack/react-query";
import {
    NavLink,
	Outlet
} from "react-router-dom";
import { pictures_list } from "../pictures/api";
import { games_list } from "../games/api";
import { Game, MasonryTable, Meta, Picture, Spin, TitleColorfull } from "@/components";
import { useTranslation } from "react-i18next";
import Jams from "../jams";
import { useSelector } from "react-redux";
import { users_likes } from "../users/api";
import { BiHeart } from "react-icons/bi";

// TODO: Рефакторинг кода после завершения

/**
 * Home
 * @description Main home page layout with outlet for nested routes
 *
 * @returns Main home page component
 *
 * @example
 * <Home />
*/
export default function Home() {
	const { t } = useTranslation();
	const { login, loading } = useSelector((state: any) => state?.login);

	const gamesQuery = useQuery({
		queryKey: [ "home", "games" ],
		queryFn: () => games_list({
			offset: 0,
			count: 5
		})
	});

	const picturesQuery = useQuery({
		queryKey: [ "home", "pictures" ],
		queryFn: () => pictures_list({
			offset: 0,
			count: 5
		})
	});

	const likedQuery = useQuery({
		queryKey: [ "home", login, "likes" ],
		enabled: !loading,
		queryFn: () => users_likes(login, {
			offset: 0,
			limit: 10,
			type: "game"
		})
	});

	return (
		<>
			<Meta
				title="ioy.app"
				description={t("about.description")}
				url="https://ioy.app/"
			/>
			<div className="flex flex-col gap-4 w-full h-full min-h-fit">
				<div className="w-full flex gap-4 h-full max-md:flex-col">
					<div className="grid grid-cols-5 max-md:grid-cols-2 gap-4 flex-1 w-full max-md:flex max-md:flex-col">
						{login && (
							<div className="relative col-span-5 w-fit max-w-full">
								<div className="flex gap-4 p-2 border border-br rounded-2xl max-w-full w-fit h-fit overflow-x-auto no-scrollbar">	
									<Spin loading={likedQuery?.isLoading}>
										{likedQuery?.data?.items?.map?.((({ title, ...item }) => (
											<Game
												dataSource={item}
												size={12}
											/>
										)))}
									</Spin>
								</div>
								<BiHeart
									className="absolute -top-2 -left-2 text-2xl text-second bg-back rounded-full -rotate-16"
								/>
								<BiHeart
									className="absolute top-5 -left-3 text-xl text-second/75 bg-back rounded-full rotate-16"
								/>
							</div>
						)}
						<div className="col-span-3 flex flex-col gap-4">
							<NavLink
								to="/games"
								className="transition-opacity hover:opacity-75 text-title w-fit"
							>
								<TitleColorfull text={t("home.titles.games")} />
							</NavLink>
							<Spin loading={gamesQuery?.isLoading}>
								<div className="grid grid-cols-5 max-md:grid-cols-3 gap-4">
									{gamesQuery?.data?.items?.map?.((
									item,
									i
								) => (
										<Game
											dataSource={item}
											size="full"
										/>
									))}
								</div>
							</Spin>
							<NavLink
								to="/pictures"
								className="transition-opacity hover:opacity-75 text-title w-fit"
							>
								<TitleColorfull text={t("home.titles.pictures")} />
							</NavLink>
							<Spin loading={picturesQuery?.isLoading}>
								<div className="w-full">
									<MasonryTable
										items={picturesQuery?.data?.items}
									/>
								</div>
							</Spin>
						</div>
						<div className="col-span-2 flex flex-col gap-4 items-end">
							<NavLink
								to="/jams"
								className="transition-opacity hover:opacity-75 text-title w-fit"
							>
								<TitleColorfull text={t("home.titles.jams")} />
							</NavLink>
							<Jams />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
