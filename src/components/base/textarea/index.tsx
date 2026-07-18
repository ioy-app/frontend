/**
 * Textarea
 * @description Multi-line text area component with optional label, focus styling, and flexible event handling
 *
 * @param className - CSS class for the outer label wrapper
 * @param classNameChild - CSS class for the inner textarea element
 * @param name - Name attribute for the textarea field
 * @param label - Optional label text displayed above the textarea
 * @param placeholder - Placeholder text shown when the textarea is empty
 * @param disabled - Whether the textarea is disabled
 * @param onLocalChange - Local change event handler (takes priority over onChange)
 * @param onChange - Form-level change event handler (used only when onLocalChange is not provided)
 * @returns A labeled textarea element with fixed height and focus border highlighting
 *
 * @example
 * <Textarea name="bio" label="Bio" placeholder="Tell us about yourself" />
 */
const Textarea: React.FC<{
	/** Textarea's className */
	className?: string;
	/** Textarea's className  */
	classNameChild?: string;
	/** Name */
	name: string;
	/** Label */
	label?: string;
	/** Placeholder */
	placeholder?: string;
	/** Disabled */
	disabled?: boolean;
	/** Local change event */
	onLocalChange?: (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => void;
	/** Form event change. Work only without onLocalChange! */
	onChange?: (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => void;
}> = ({
	className,
	classNameChild,
	label,
	placeholder,
	disabled,
	name,
	onLocalChange,
	...props
}) => (
	<label
		className={`border border-br w-full rounded-xl px-4 py-2 has-focus:border-primary has-focus:text-primary transition-colors ${(className && className) || ""}`}
	>
		{label && (
			<p className="text-placeholder transition-colors">
				{label}
			</p>
		)}
		<textarea
			name={name}
			placeholder={placeholder}
			disabled={disabled}
			className={`outline-none text-default w-full transition-colors h-25 resize-none ${(classNameChild && classNameChild) || ""}`}
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

export default Textarea;
