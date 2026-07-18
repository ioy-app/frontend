import { Logo } from "@/icons";

/**
 * Spin
 * @description Loading spinner component that displays an animated logo while loading, or renders children when not loading
 *
 * @param children - Content to render when not in loading state
 * @param loading - Whether the spinner is active (shows animated logo instead of children)
 * @param logo - Custom logo image source to use as the spinner (defaults to the app Logo)
 * @returns An animated spinning logo when loading, or the children content otherwise
 *
 * @example
 * <Spin loading={isLoading}>Content loaded!</Spin>
 */
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
