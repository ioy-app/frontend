import { MasonryTable, Spin } from "@/components";
import { pictures_list } from "@/pages/pictures/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";
import { users_instances } from "../api";

/**
 * Content by user
 *
 * @example
 * <UsersContent />
*/
const UsersContent: React.FC = () => {
	const params = useParams();
	const login = params?.login;

	const query = useInfiniteQuery({
		queryKey: [ "users", login, "body" ],
		queryFn: async ({ pageParam = 0 }) => {
			const response = await users_instances(login, {
				offset: pageParam
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
	const items = useMemo(() => [].concat(...(query?.data?.pages?.map(page => page.items) || [])), [ query?.data ]);

	return (
		<Spin loading={query?.isPending}>
			<InfiniteScroll
				className="w-full h-full! overflow-hidden!"
				dataLength={items?.length}
				next={() => query.fetchNextPage()}
				hasMore={query.hasNextPage}
				loader={(<Spin loading />)}
				scrollableTarget="scrollable-content"	
			>
				<MasonryTable items={items} />
			</InfiniteScroll>
		</Spin>
	);
};

export default UsersContent;
