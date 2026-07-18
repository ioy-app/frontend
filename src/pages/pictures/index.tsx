import imgEmpty from "@/icons/empty.svg";
import {
	Game,
	MasonryTable,
	Meta,
	Picture,
	SearchBlock,
	Spin,
	Tag,
	ViewModel,
} from "@/components";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { NavLink, useSearchParams } from "react-router";
import { pictures_list, pictures_tags } from "./api";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo } from "react";

/**
 * Pictures
 * @description Home page pictures listing with infinite scroll, search, and masonry layout
 * @returns JSX element with pictures masonry grid and search
 */
const Pictures: React.FC<{}> = ({}) => {
	const { t } = useTranslation();
	const [ searchParams, setSearchParams ] = useSearchParams();

	const query = useInfiniteQuery({
		queryKey: [ "home", "pictures", searchParams?.toString() ],
		queryFn: async ({ pageParam = 0 }) => {
			const response = await pictures_list({
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
		queryKey: [ "home", "pictures", "tags" ],
		queryFn: () => pictures_tags()
	});

	const items = useMemo(() => [].concat(...(query?.data?.pages?.map(page => page.items) || [])), [ query?.data ]);

	return (
		<>
			<Meta
				title="ioy.app"
				description={t("about.description")}
				url=""
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
					className="w-full h-full! overflow-hidden!"
					dataLength={items?.length}
					next={() => query.fetchNextPage()}
					hasMore={query.hasNextPage}
					loader={(<Spin loading />)}
					endMessage={(
						<div className="flex flex-col justify-center items-center py-4 gap-2 text-xl text-text/35">
							<ViewModel
								name="rocket-pictures"
								href="/resources/gltf/rocket.gltf"
								spdX={.2}
								spdY={-.5}
							/>
							<p>{t("pictures.empty")}</p>
						</div>
					)}
				>
					<MasonryTable items={items} />
				</InfiniteScroll>
			</Spin>
		</>
	);
};

export default Pictures;
