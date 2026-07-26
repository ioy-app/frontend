import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { LinkifyText, Meta, Spin, User } from "@/components";
import { BiUser } from "react-icons/bi";
import NumberFlow from "@number-flow/react";
import UsersControls from "./controls";
import { paths } from "@/routes";

/**
 * Header of user's page
 *
 * @example
 * <UsersHeader />
*/
const UsersHeader: React.FC<{
	subscribers: number;
}> = ({
	subscribers
}) => {
	const params = useParams();
	const queryClient = useQueryClient();
	const login = params?.login;
	const dataSource = queryClient.getQueryData([ "users", login ]);
	const isLoading = queryClient.getQueryState([ "users", login ]) == "pending";

	return (
		<Spin loading={isLoading}>
			<Meta
				title={login}
				description={dataSource?.description}
				url={paths.users.details(login)}
			/>
			{dataSource?.is_banner && (
				<div
					className="absolute z-0 bg-br/25 w-full h-42 -top-20 rounded-full overflow-hidden flex justify-center items-center"
				>
					<img 
						src={`/api/v1/users/${login}/banner`}
						className="w-full aspect-video"
					/>	
				</div>
			)}
			<User
				login={login}
				dataSource={dataSource}
				vertical
				hideLogin
				size="large"
				nolink
				className="z-1 border-back border-8 rounded-full"
			/>
			<p className={`min-w-20 text-title text-center z-1 ${dataSource?.is_donut && "text-second" || ""} relative flex items-center gap-4 justify-center`}>
				{login}
				<div className="absolute left-full px-4">
					<UsersControls />
				</div>
			</p>
			{!!dataSource?.description && (
				<LinkifyText className="flex justify-center items-center z-1">
					{dataSource?.description}
				</LinkifyText>
			)}
			<div className="text-default flex items-center justify-center gap-2 z-1">
				<div className="flex items-center justify-center gap-2 min-w-20">
					<BiUser />
					<NumberFlow
						value={subscribers || 0}
						willChange
						key={`${login}-subscribers`}
						format={{
							notation: "compact",
							compactDisplay: "short",
							roundingMode: "trunc"
						}}
					/>
				</div>
			</div>
		</Spin>
	);
};

export default UsersHeader;
