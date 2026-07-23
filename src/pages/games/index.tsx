import { games_list, games_tags } from "./api";
import imgEmpty from "@/icons/empty.svg";
import {
	Game,
	Meta,
	SearchBlock,
	Spin,
	Tag,
	ViewModel,
} from "@/components";
import GameProps from "./api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { NavLink, useSearchParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

/**
 * Games
 * @description Home page games listing with infinite scroll, search, and popular tags display
 * @returns JSX element with games grid and search
 */
const Games: React.FC<{}> = ({}) => {
	const { t } = useTranslation();
	const [ searchParams, setSearchParams ] = useSearchParams();

	const query = useInfiniteQuery({
		queryKey: [ "home", "games", searchParams?.toString() ],
		queryFn: async ({ pageParam = 0 }) => {
			const response = await games_list({
				offset: pageParam,
				search: searchParams?.get("search")
			});
			return response;
		},
		getNextPageParam: (lastPage) => {
			const next = lastPage.offset + lastPage.limit;
			if (next >= lastPage?.total)
				return null;
			return next;
		},
		getPreviousPageParam: (firstPage) => firstPage.offset
	});

	const tags = useQuery({
		queryKey: [ "home", "games", "tags" ],
		queryFn: () => games_tags()
	});

	const items = [].concat(...(query?.data?.pages?.map(page => page.items) || []));

	return (
		<>
			<Meta
				title={t("games.title")}
				description={t("about.description")}
				url="https://ioy.app/games"
			/>
			<SearchBlock
				onSubmit={(data) => {
					if (data?.search)
						searchParams?.set("search", data?.search);
					else
						searchParams.delete("search");
					setSearchParams(searchParams);
				}}
				value={searchParams?.get("search")}
				disabled={query?.isPending}
			/>
			<Spin loading={tags?.isPending}>
				{tags?.data?.items?.length > 0 && (
					<div className="flex gap-4 items-center justify-center flex-wrap">
						{tags?.data?.items?.map((tag) => (
							<Tag
								title={tag}
								link={""}
							/>
						))}
					</div>
				)}
			</Spin>	
			<Spin loading={query?.isPending}>
				<InfiniteScroll
					className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2"
					dataLength={items?.length}
					next={() => query.fetchNextPage()}
					hasMore={query.hasNextPage}
					loader={(
						<Spin
							loading
							className="col-span-5"
						/>
					)}
					scrollableTarget="scrollable-content"
					endMessage={(
						<div className="flex flex-col justify-center items-center py-4 gap-2 text-xl text-text/35 col-span-5">
							<ViewModel
								name="rocket-pictures"
								href="/resources/gltf/computer.gltf"
								spdX={.2}
								spdY={-.5}
							/>
							<p>{t("games.empty")}</p>
						</div>
					)}
				>
					{items?.map((item) => (
						<Game
							dataSource={item}
							ket={item?.id}
							size="full"
						/>
					))}
				</InfiniteScroll>
			</Spin>
		</>
	);
};

export default Games;
