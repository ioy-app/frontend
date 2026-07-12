import { feed_global } from "@/api/feed";
import { Post, Spin, ViewModel } from "@/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

/**
 * Feed
 * @example
 * return <Feed />
*/
export default function Feed({}) {
  const { t } = useTranslation();

  const query = useInfiniteQuery({
    queryKey: [ "feed-global" ],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await feed_global(pageParam);
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

	const items = useMemo(() => [].concat?.(...(query?.data?.pages?.map?.(page => page?.items || []) || [])), [ query?.data ]);

  return (
    <div className="w-full h-fit min-h-full gap-4 flex">
      <div className="w-full flex flex-col items-center">
				<Spin loading={query?.isPending}>
					<InfiniteScroll
						className="w-full grid grid-cols-1 gap-4 max-lg:grid-cols-1"
						dataLength={items?.length}
						next={() => query.fetchNextPage()}
						hasMore={query.hasNextPage}
						loader={(<Spin loading/>)}
						scrollableTarget="scrollable-content"
						endMessage={(
							<div className="flex flex-col justify-center items-center py-4 gap-2 text-xl text-text/35 w-full">
								<ViewModel
									name="computer-feed"
									href="/resources/gltf/computer.gltf"
									spdX={.2}
									spdY={-.5}
								/>
								<p>{t("feed.empty")}</p>
							</div>
						)}

					>
						{items?.map((item) => (
							<Post
								type={item?.type}
								data={item}
								key={`${item?.type}-${item?.id}`}
							/>
						))}
					</InfiniteScroll>
				</Spin>
      </div>
    </div>
  );
}
