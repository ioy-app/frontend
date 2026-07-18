/**
	* Button
	* @description Interactive button component with multiple visual variants, loading state, and shape options
	*
	* @param children - Content to render inside the button
	* @param disabled - Whether the button is disabled
	* @param htmlType - HTML button type attribute (e.g. "button", "submit", "reset")
	* @param onClick - Click event handler
	* @param variant - Visual style variant of the button
	* @param type - Shape of the button (rounded or circle)
	* @param className - Additional CSS class names
	* @param loading - Whether the button is in a loading state (shows pulse animation and disables interaction)
	* @returns A styled button element with the specified variant and options
	*
	* @example
	* <Button variant="primary" onClick={handleSubmit}>Submit</Button>
	*/
const Button: React.FC<{
	/** Content */
	children: React.ReactNode;
	/** Disabled */
	disabled?: boolean;
	/** Form type */
	htmlType?: HTMLButtonElement["type"];
	/** onClick event */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	/** Variant */
	variant?: "default" | "primary" | "second" | "danger" | "text" | "clear";
	/** Type */
	type?: "rounded" | "circle";
	/** Styles */
	className?: string;
	/** Loading state */
	loading?: boolean;
}> = ({
	children,
	disabled,
	htmlType="button",
	onClick,
	variant="default",
	type="rounded",
	className,
	loading
}) => (
	<button
	className={`button ${type == "circle" && "rounded-full" || ""} button-${variant} text-default ${(className && className) || ""} ${(loading && "animate-pulse") || ""}`}
	disabled={disabled || loading}
	type={htmlType}
	onClick={onClick}
	>
	{children && children}
	</button>
);

export default Button;
