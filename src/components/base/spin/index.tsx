import { Logo } from "@/icons";

const Spin: React.FC<{
	/** Content */
	children?: React.ReactNode;
	/** Loading state */
	loading?: boolean;
	logo?: any;
}> = ({
	children,
	loading,
	logo=Logo
}) => {
	if (loading)
		return (
			<div className="flex-1 w-full h-full flex justify-center items-center">
				<img
					src={logo}
					className="h-full aspect-square max-w-24 max-h-24 animate-spin"
				/>
			</div>
		);

	return children;
};

export default Spin;
