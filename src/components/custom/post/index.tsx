import GameProps from "@/pages/games/api";
import JamProps from "@/pages/jams/api";
import Game from "../../content/game";
import User from "../../content/user";
import dayjs from "dayjs";
import Picture from "../../content/picture";

/**
	* Post
	* @description Feed post card displaying user info, content preview, and tags
	*
	* @param data - Post data object containing title, description, tags, and author info
	* @param type - Content type determining the preview component (game, jam, or picture)
	* @returns A bordered card with author info, content preview, title, description, and tags
	*
	* @example
	* <Post data={postData} type="game" />
	*/
const Post: React.FC<{
	data: JamProps | GameProps;
	type?: "game" | "jam" | "picture";
}> = ({
	data,
	type="game"
}) => {
	const {
		title,
		description,
		tags,
		author_data,
		...props
	} = data;

	return (
		<div className="flex flex-col gap-4 border border-br rounded-2xl p-4">
			<div className="flex justify-between items-center gap-4">
				<User
					dataSource={author_data}
					login={author_data?.login}
					size="small"
					className="flex-row flex w-fit"
				/>
				<p className="text-placeholder text-text/50">{dayjs(data.date_created).format("HH:mm DD.MM.YYYY")}</p>				
			</div>

			<div className="flex gap-4 border border-br p-4 rounded-2xl">
				{data?.type == "game" && (
					<Game
						dataSource={props}
					/>
				)}
				{data?.type == "picture" && (
					<Picture
						dataSource={props}
					/>
				)}
				<div className="flex flex-col gap-4">
					<p className="text-title">{title}</p>
					<p className="text-default">{description}</p>
				</div>
			</div>
		</div>
	);
}

export default Post;
