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
