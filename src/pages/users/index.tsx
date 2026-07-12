import React, {
	useEffect,
	useReducer,
	useState,
} from "react";
import { useSelector } from "react-redux";
import {
	useNavigate,
	useOutletContext,
	useParams,
} from "react-router-dom";
import {
	User,
	Button,
	Spin,
	Block,
	Game,
	LinkifyText,
	Report,
	Meta,
	Picture,
} from "@/components";
import { StoreProps } from "@/stories";
import Edit from "./modals/edit";
import {
	users_details,
	users_games,
	users_likes,
	users_pictures,
	users_subscribe,
	users_following,
} from "./api";
import { useModal, useNotify } from "@/hooks";
import { useTranslation } from "react-i18next";
import { dashboard_paths } from "@/pages/dashboard/routes";
import {
	BiCog,
	BiCommentError,
	BiGridAlt,
	BiUser,
	BiUserMinus,
	BiUserPlus,
} from "react-icons/bi";
import {
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import UserContent from "./content";
import { paths } from "@/routes";
import ErrorPage from "../error";

export default function Profile() {
	const context = useOutletContext();
	const { t } = useTranslation();
	const navigator = useNavigate();
	const { token } = useSelector(
		(state: StoreProps) => state.login,
	);
	const params = useParams();
	const { login } = params;
	const { notify } = useNotify();
	const { modal } = useModal();
	const queryClient = useQueryClient();

	const handleSubscribe = async () => {
		try {
			if (!data) throw new Error("Пользователь не найден");

			const response: Response =
				await users_subscribe(login);

			if (!data.controls)
				throw new Error("Нет авторизации");
			const is_subscribe =
				response?.status == "created" ? true : false;
			const subscribers =
				data.subscribers +
				(response?.status == "created" ? 1 : -1);

			notify(
				t(
					response?.status == "created"
						? "profile.success.subscribe"
						: "profile.success.unsubscribe",
					{ login },
				),
				response?.status == "created"
					? "success"
					: "warning",
			);

			queryClient.setQueryData(["user", login], (prev) => ({
				...prev,
				subscribers,
				controls: {
					...prev?.controls,
					is_subscribe,
				},
			}));
		} catch (err) {
			notify(t(err?.message?.toString()), "error");
		}
	};

	const {
		data,
		status,
		error,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["user", login],
		queryFn: async () => users_details(login),
		retry: 0
	});

	useEffect(() => {
		if (!data?.controls?.is_me) return;
		if (!context?.refProfile?.current) return;
		context.refProfile.current.style.display = "none";
		return () => {
			if (context.refProfile?.current)
				context.refProfile.current.style.display = "flex";
		};
	}, [context?.refProfile?.current, data]);

	const isMe = data?.controls?.is_me;
	const isLoading = status == "pending" || isRefetching;

	if (status == "error") {
		return <ErrorPage msg={error?.message || "errors.exists"} />;
	}

	return (
		<Spin loading={isLoading}>
			<Meta
				title={login}
				description={data?.description}
				url={paths.users.details(login)}
			/>
			<div className="w-full px-4 py-4 flex gap-4 flex-col items-center flex-1">
				<div className="flex flex-col gap-4 w-[60%] max-md:w-full items-center h-full">
					<div className="w-32 h-32">
						<User
							login={login}
							dataSource={{
								is_avatar: data?.is_avatar,
								is_donut: data?.is_donut
							}}
							vertical
							hideLogin
							size="large"
							className="transition-all w-full h-full"
							nolink
						/>
					</div>
					<div
						className={`transition-all duration-200`}
					>
						<p
							className={`text-title text-center ${data?.is_donut && "text-second" || ""}`}
						>
							{data?.login}
						</p>
					</div>
					<div
						className="flex gap-4 flex-col items-center pb-4 w-full"
					>
						<p
							className="text-default flex items-center gap-2"
							key={data?.subscribers}
						>
							<BiUser />
							{data?.subscribers || 0}
						</p>
						{data?.description && (
							<p className="w-full text-default flex flex-wrap justify-center items-center gap-2 border border-br p-4 rounded-xl">
								<LinkifyText className="flex justify-center items-center">
									{data?.description}
								</LinkifyText>
							</p>
						)}
					</div>
					{token && (
						<div className="flex gap-4">
							{isMe ? (
								<>
									<Button
										variant="default"
										htmlType="button"
										onClick={() =>
											navigator(dashboard_paths.list)
										}
									>
										<BiGridAlt />
										{t("buttons.dashboard")}
									</Button>
									<Button
										variant="default"
										onClick={() => {
											modal("", (onClose) => (
												<Edit
													onClose={(login?: string) => {
														try {
															if (login)
																navigator(
																	paths.users.details(login),
																);
															refetch();
														} catch (err) {}
														onClose && onClose();
													}}
													login={login}
													navigator={navigator}
												/>
											));
										}}
									>
										<BiCog />
										{t("buttons.settings")}
									</Button>
								</>
							) : (
								<>
									<Button
										onClick={handleSubscribe}
										variant={
											data?.controls?.is_subscribe
												? "second"
												: "primary"
										}
									>
										{!data?.controls?.is_subscribe
											? t("buttons.subscribe")
											: t("buttons.unsubscribe")}
										{!data?.controls?.is_subscribe ? (
											<BiUserPlus />
										) : (
											<BiUserMinus />
										)}
									</Button>
									<Button
										onClick={() => modal("", (onClose) => (
											<Report
												type="user"
												target_id={data?.id}
												Instance={(
													<div className="flex flex-col gap-4 items-center justify-center">
														<div>
															<User
																login={login}
																dataSource={{
																	is_avatar: data?.is_avatar,
																}}
																size="large"
																hideLogin
																className="transition-all w-full h-full"
																nolink

															/>
														</div>
														<p className="text-title">{login}</p>
													</div>
												)}
												onClose={onClose}
											/>
										))}
									>
										{t("buttons.report")}
										<BiCommentError />
									</Button>
								</>
							)}
						</div>
					)}
					<div className="flex flex-col gap-4 w-full">
						{data?.privacy?.games && (
							<Block
								title={t("profile.titles.games")}
								id="games"
								request={async (
									page: number,
									count: number,
								) => {
									const search = new URLSearchParams();
									search.set(
										"offset",
										String((page - 1) * count),
									);
									search.set("limit", String(count));

									const games = await users_games(
										login,
										search,
									);

									return {
										items: games.items.map((item) => ({
											dataSource: item,
										})),
										total: games.total,
									};
								}}
								Component={Game}
								onOpen={() => {
									modal("", (onClose) => (
										<UserContent
											onClose={(path) => {
												navigator(path);
												onClose && onClose();
											}}
											id="games"
											login={login}
											fn={users_games}
										/>
									));
								}}
							/>
						)}
						{data?.privacy?.pictures && (
							<Block
								title={t("profile.titles.pictures")}
								id="pictures"
								request={async (
									page: number,
									count: number,
								) => {
									const search = new URLSearchParams();
									search.set(
										"offset",
										String((page - 1) * count),
									);
									search.set("limit", String(count));

									const games = await users_pictures(
										login,
										search,
									);

									return {
										items: games.items.map((item) => ({
											dataSource: item,
										})),
										total: games.total,
									};
								}}
								Component={Picture}
								onOpen={() => {
									modal("", (onClose) => (
										<UserContent
											onClose={(path) => {
												navigator(path);
												onClose && onClose();
											}}
											id="pictures"
											login={login}
											fn={users_pictures}
										/>
									));
								}}
							/>
						)}
						{data?.privacy?.subscribers && (
							<Block
								title={t("profile.titles.subscribers")}
								id="subscribers"
								request={async (
									page: number,
									count: number,
								) => {
									const search = new URLSearchParams();
									search.set(
										"offset",
										String((page - 1) * count),
									);
									search.set("limit", String(count));

									const users = await users_following(
										login,
										search,
									);

									return {
										items: users.items.map((item) => ({
											login: item.login,
											dataSource: item,
											size: "large",
											vertical: true
										})),
										total: users.total,
									};
								}}
								Component={User}
								onOpen={() => {
									modal("", (onClose) => (
										<UserContent
											onClose={(path) => {
												navigator(path);
												onClose && onClose();
											}}
											id="subscribers"
											login={login}
											fn={users_following}
										/>
									));
								}}
							/>
						)}
						{data?.privacy?.likes && (
							<Block
								title={t("profile.titles.likes")}
								id="likes"
								request={async (
									page: number,
									count: number,
								) => {
									const search = new URLSearchParams();
									search.set(
										"offset",
										String((page - 1) * count),
									);
									search.set("limit", String(count));

									const games = await users_likes(
										login,
										search,
									);

									return {
										items: games.items.map((item) => ({
											dataSource: item,
										})),
										total: games.total,
									};
								}}
								Component={Game}
								onOpen={() => {
									modal("", (onClose) => (
										<UserContent
											onClose={(path) => {
												navigator(path);
												onClose && onClose();
											}}
											id="likes"
											login={login}
											fn={users_likes}
										/>
									));
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</Spin>
	);
}

export { Edit as ProfileEdit };
