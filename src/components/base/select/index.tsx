import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
	BiChevronDown,
	BiChevronUp,
	BiFileBlank,
	BiX,
} from "react-icons/bi";

interface Option {
	label: React.ReactNode;
	value: string;
}

type SelectComponentProps = {
	options: Option[];
} & Omit<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	"children"
>;

/**
 * Select
 * @description Custom animated dropdown selector with portal-based options list, clear functionality, and react-hook-form integration
 *
 * @param name - Name attribute for the select field (used with form context)
 * @param options - Array of selectable options with label and value
 * @param value - Currently selected option object
 * @param onChange - Change event handler triggered when a selection is made
 * @param placeholder - Placeholder text shown when no option is selected
 * @param className - Additional CSS class names for the select container
 * @param ref - Ref forwarded to the outer container div
 * @param isFirstOption - Whether to auto-select the first option on mount
 * @param disabled - Whether the select is disabled
 * @param allowClear - Whether to show a clear button to reset the selection
 * @param onUpdate - Callback invoked with the selected value when the selection changes
 * @returns A custom dropdown selector with animated open/close states and a portal-rendered options list
 *
 * @example
 * <Select name="category" options={categories} placeholder="Select category" allowClear />
 */
const Select: React.FC<SelectComponentProps & {
	placeholder?: string;
	isFirstOption?: boolean;
	ref?: React.Ref<HTMLDivElement>;
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	value?: Option;
	allowClear?: boolean;
	onUpdate?: (value?: string) => void;
}> = ({
	name,
	options,
	value,
	onChange,
	placeholder,
	className,
	ref,
	isFirstOption,
	disabled,
	allowClear,
	onUpdate
}) => {
	const { t } = useTranslation();
	const [ isOpen, setOpen ] = useState<boolean>(false);
	const [ localValue, setValue ] = useState<Option>(value);
	const localRef = useRef(null);
	const form = useFormContext();
	const field = form?.watch?.(name);

	useEffect(() => {
		const value = field;
		if (!value) {
			setValue(undefined);
			return;
		}

		const option = options?.find((opt) => opt.value == value);
		setValue(option);

	}, [ field ]);

	useEffect(() => {
		if (!isFirstOption)
			return;
		onChange &&
			onChange({
				target: {
					name: name,
					value: options?.[0]?.value,
				},
			});
		setValue(options?.[0]);
		onUpdate && onUpdate?.(options?.[0]?.value);
	}, []);

	const rect = localRef?.current?.getBoundingClientRect?.();

	return (
		<div
			className="flex flex-col gap-2 select-none"
			ref={(e) => {
				ref && ref(e);
				localRef.current = e;
			}}
			onMouseLeave={() => setOpen(false)}
		>
			<div
				className={`rounded-xl border ${(isOpen && "border-primary") || "border-br"} text-default h-10 flex flex-row gap-2 items-center justify-between px-4 py-2 ${className && className} transition-colors ${(disabled && "hover:border-disabled border-disabled cursor-not-allowed text-disabled-content") || "hover:border-primary cursor-pointer group"}`}
				onClick={() => !disabled && setOpen((prev) => !prev)}
			>
				<AnimatePresence
					mode="wait"
					initial={false}
				>
					{(localValue || placeholder) && (
						<motion.p
							key={localValue?.label || placeholder}
							className="overflow-hidden truncate ..."
							initial={{
								opacity: 0
							}}
							animate={{
								opacity: 1
							}}
							exit={{
								opacity: 0
							}}
							transition={{
								duration: .15
							}}
						>
							{localValue?.label || placeholder}
						</motion.p>
					)}
				</AnimatePresence>
				<AnimatePresence
					mode="wait"
					initial={false}
				>
					<motion.div
						className="flex items-center gap-1"
						key={localValue && allowClear ? "clear" : isOpen ? "closed" : "opened"}
						initial={{
							rotate: "180deg",
							scale: .5
						}}
						animate={{
							rotate: "0deg",
							scale: 1
						}}
						exit={{
							rotate: "-180deg",
							scale: .5
						}}
						transition={{
							duration: .15
						}}	
					>	
						{(localValue && allowClear) ? (
							<BiX
								className="text-xl text-placeholder hover:text-primary transition-colors cursor-pointer"
								onClick={(e) => {
									e.stopPropagation();
									setValue(undefined);
									onChange && onChange({
										target: {
											name: name,
											value: null,
										},
									});
									onUpdate && onUpdate?.(null);
								}}
							/>
						)
						:
						(!isOpen ? (
							<BiChevronDown className="text-2xl text-br group-hover:text-primary" />
						) : (
							<BiChevronUp className="text-2xl text-primary" />
						))}
					</motion.div>
				</AnimatePresence>
			</div>
			{isOpen && createPortal(
				<div
					className={`fixed flex flex-col gap-4 px-4 py-2 rounded-xl border border-br bg-back z-1000 w-fit shadow-md right-0`}
					style={{
						top: (rect?.top + rect?.height) + "px",
						left: rect?.left + "px",
						width: rect?.width + "px"
					}}
				>
					{!options?.length && (
						<div className="flex flex-1 flex-col justify-center items-center p-4">
							<BiFileBlank className="text-2xl text-disabled-content" />
							<p className="text-center text-placeholder">
								{t("select.nodata")}
							</p>
						</div>
					)}
					{options?.map((
					option: Option,
					i: number
				) => (
						<div
							className={`group cursor-pointer text-default transition-colors ${(option.value == localValue?.value && "text-primary") || "text-text"}`}
							key={i}
							onClick={() => {
								setValue(option);
								setOpen(false);
								onChange && onChange({
									target: {
										name: name,
										value: option.value,
									},
								});
								onUpdate && onUpdate?.(option?.value);
							}}
						>
							<p className="group-hover:text-primary overflow-hidden truncate ...">
								{option.label}
							</p>
						</div>
					))}
				</div>
			, document.body)}
		</div>
	);
};

export default Select;
