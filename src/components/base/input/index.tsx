/**
 * Input
 * @description Text input component with optional label, focus styling, and flexible event handling
 *
 * @param className - CSS class for the outer label wrapper
 * @param classNameChild - CSS class for the inner input element
 * @param name - Name attribute for the input field
 * @param label - Optional label text displayed above the input
 * @param type - Input type (text, password, search, or email)
 * @param placeholder - Placeholder text shown when input is empty
 * @param disabled - Whether the input is disabled
 * @param onLocalChange - Local change event handler (takes priority over onChange)
 * @param onChange - Form-level change event handler (used only when onLocalChange is not provided)
 * @param onKeyPress - Key press event handler
 * @returns A labeled input element with focus border highlighting
 *
 * @example
 * <Input name="email" label="Email" type="email" placeholder="Enter your email" />
 */
const Input: React.FC<{
	/** Label's className */
	className?: string;
	/** Input's className  */
	classNameChild?: string;
	/** Name */
	name: string;
	/** Label */
	label?: string;
	/** Input's type */
	type?: "text" | "password" | "search" | "email";
	/** Placeholder */
	placeholder?: string;
	/** Disabled */
	disabled?: boolean;
	/** Local change event */
	onLocalChange?: (
		e: React.ChangeEvent<HTMLInputElement>,
	) => void;
	/** Form event change. Work only without onLocalChange! */
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement>,
	) => void;
	/** Form event press any keys */
	onKeyPress?: (
		e: React.KeyboardEvent<HTMLInputElement> &
			React.ChangeEvent<HTMLInputElement>,
	) => void;
} & React.DOMAttributes<HTMLInputElement>> = ({
	className,
	classNameChild,
	label,
	type = "text",
	placeholder,
	disabled,
	name,
	onLocalChange,
	...props
}) => (
	<label
		className={`box-border border border-br w-full rounded-xl px-4 py-2 has-focus:border-primary has-focus:text-primary transition-colors ${(className && className) || ""} ${(!label && "h-10 px-0 py-0 flex flex-row items-center") || ""}`}
	>
		{label && (
			<p className="text-placeholder transition-colors">
				{label}
			</p>
		)}
		<input
			name={name}
			type={type}
			placeholder={placeholder}
			disabled={disabled}
			className={`outline-none text-default w-full transition-colors ${(classNameChild && classNameChild) || ""} ${(!label && "px-0 py-2 h-full") || ""}`}
			{...props}
			onChange={(e) => {
				onLocalChange && onLocalChange(e);
				props?.onChange &&
					!onLocalChange &&
					props.onChange(e);
			}}
		/>
	</label>
);

export default Input;
