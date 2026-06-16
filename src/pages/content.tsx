import * as Components from "@/components";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMe, setToken } from "@/stories/login";
import { Routes } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/api";
import { useEffect } from "react";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function Content() {
	const dispatch = useDispatch();
	const { data, isError } = useQuery({
		queryKey: [ "profile", "token" ],
		queryFn: async () => {
			const response = await apiInstance.get(
				Routes.profile.refresh,
			);
			return response;
		},
		refetchInterval: 120_000,
		refetchIntervalInBackground: false,
		staleTime: 240_000,
	});

	if (isError) dispatch(setToken(null));
	else {
		dispatch(setToken(data));
		dispatch(fetchMe());
	}

	
	return (
		<div className="flex max-md:flex-col-reverse w-full min-h-screen bg-back text-text">
			<Components.Sider collapse />
			<div className="flex flex-col w-full h-fit">
				<main className="flex-1 p-4 pb-0 gap-4 flex flex-col w-full min-h-full">
					<ScrollToTop />
					<Outlet />
					<Components.Footer />
				</main>
			</div>
		</div>
	);
}
