import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { users_subscribe } from "../api";
import { useModal, useNotify } from "@/hooks";
import { Button, Report, Select, Spin, User } from "@/components";
import { BiCommentError, BiDotsHorizontalRounded, BiUserMinus, BiUserPlus } from "react-icons/bi";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

/**
 * Controls for user's page
 *
 * @example
 * <UsersControls />
*/
const UsersControls: React.FC = () => {
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const params = useParams();
	const login = params?.login;
	const { notify } = useNotify();
	const { modal } = useModal();

	const subscribe = useMutation({
		mutationKey: [ "users", login, "subscribe" ],
		mutationFn: async () => {
			const response = await users_subscribe(login);
			return Boolean(response?.status == "created");
		},
		onError: (err) => notify(t(err?.message?.toString?.())),
		onSuccess: (isSubscribe: boolean) =>
			queryClient.setQueryData([ "users", login ], (prev) => ({
				...prev,
				subscribers: Number(prev?.subscribers || 0) + (isSubscribe ? 1 : -1),
				controls: {
					...prev?.controls,
					is_subscribe: isSubscribe
				}
			}))
	});

	const dataSource = queryClient.getQueryData([ "users", login ]);
	const isLoading = queryClient.getQueryState([ "users", login ]) == "pending";

	const isSubscribe = useMemo(() => dataSource?.controls?.is_subscribe, [ dataSource ]);
	const isMe = useMemo(() => dataSource?.controls?.is_me, [ dataSource ]);

	const opts = useMemo(() => {
		const controls = [
			{
				label: (
					<span className="flex items-center justify-between gap-2">
						{t("buttons.report")}
						<BiCommentError />
					</span>
				),
				value: "report"
			}
		];

		if (isSubscribe)
			controls.splice(0, 0, {
				label: (
					<span className="flex items-center justify-between gap-2">
						{t("buttons.unsubscribe")}
						<BiUserMinus />
					</span>
				),
				value: "unsubscribe"
			});

		return controls;
	}, [ isSubscribe ]);

	if (isMe)
		return null;

	return (
		<Spin loading={isLoading}>
			<div className="flex gap-4 items-center">
				<AnimatePresence
					mode="wait"
					initial={false}
				>
					{!isSubscribe && (
						<motion.div
							initial={{
								opacity: 0,
								scaleX: 0
							}}
							animate={{
								opacity: 1,
								scaleX: 1
							}}
							exit={{
								opacity: 0,
								scaleX: 0
							}}
							transition={{
								duration: .1
							}}
						>
							<Button
								variant={isSubscribe ? "default" : "primary"}
								disabled={subscribe.isPending}
								onClick={() => subscribe.mutate()}
								className="transition-all"
							>
								<BiUserPlus />
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
				<Select
					options={opts}
					onChange={({ target: { value }}) => {
						switch(value) {
							case "unsubscribe":
								subscribe.mutate();
							break;
							case "report":
								modal("", (onClose) => (
									<Report
										type="user"
										target_id={dataSource?.id}
										Instance={(
											<div className="flex flex-col gap-4 items-center justify-center">
												<div>
													<User
														login={login}
														dataSource={{
															is_avatar: dataSource?.is_avatar,
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
								))
							break;
						}
					}}
					placeholder={<BiDotsHorizontalRounded />}
					hideIcon
					noSelect
				/>
			</div>
		</Spin>
	);
};

export default UsersControls;
