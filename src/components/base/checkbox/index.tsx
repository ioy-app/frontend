/**
 * Checkbox
 * @description Custom toggle checkbox input with a circular design and optional label
 *
 * @param name - Name attribute for the checkbox input
 * @param placeholder - Helper text displayed next to the checkbox
 * @param onChange - Change event handler for the checkbox input
 * @param ref - Ref forwarded to the underlying input element
 * @param disabled - Whether the checkbox is disabled
 * @returns A styled checkbox with a circular indicator and optional placeholder text
 *
 * @example
 * <Checkbox name="agree" placeholder="I agree to the terms" onChange={handleChange} />
 */
const Checkbox: React.FC<{
	/** Name */
	name: string;
	/** Help title */
	placeholder?: string;
	/** Change event */
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	/** Link to original checkbox */
	ref?: React.Ref<HTMLInputElement>;
	/** Disabled component */
	disabled?: boolean;
}> = ({
	name,
	placeholder,
	onChange,
	ref,
	disabled
}) => (
	<label
		className="w-fit inline-flex flex-row gap-2 items-center has-checked:text-primary cursor-pointer text-text"
	>
		<div className="flex justify-center items-center border border-br rounded-full w-6 h-6 overflow-hidden has-checked:border-primary">
			<input
				type="checkbox"
				name={name}
				ref={ref}
				onChange={onChange}
				disabled={disabled}
				className="w-[70%] h-[70%] appearance-none rounded-full checked:bg-primary cursor-pointer"
			/>
		</div>
		<p className="text-placeholder select-none">
			{placeholder}
		</p>
	</label>
);

export default Checkbox;
