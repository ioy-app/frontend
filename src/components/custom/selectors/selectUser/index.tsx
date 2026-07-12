import { useEffect, useState } from "react";
import Input from "../../../base/input";
import User from "../../../content/user";
import { BiSearchAlt2, BiX } from "react-icons/bi";
import { users_details } from "@/pages/users/api";
import { useNotify } from "@/hooks";
import { useTranslation } from "react-i18next";
import UserProps from "@/pages/users/api";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

/**
 * Multiple select users
 * @example
 * return <SelectUser />
 */
const SelectUser: React.FC<{
	name: string;
	label?: string;
	placeholder?: string;
	setValue: (key: string, value: any) => void;
	disabled?: boolean;
	initial?: UserProps[];
}> = ({
	name,
	label,
	placeholder,
	setValue,
	disabled,
	initial
}) => {
	const { t } = useTranslation();
	const [ localValue, setLocalValue ] = useState<UserProps[]>([]);
	const { notify } = useNotify();
	const methods = useForm();
	
	/** Search userdata by login */
	const search = useMutation({
		mutationKey: [ "selector", "user" ],
		mutationFn: async (username: string) => {
			const response = await users_details(username);
			return response;
		},
		onSuccess: (data: UserProps) => {
			methods.resetField("search");
			setLocalValue((prev) => {
				return [
					...(prev || []),
					{
						id: data?.id,
						login: data?.login,
						is_donut: data?.is_donut,
						is_avatar: data?.is_avatar
					}
				];
			});
		},
		onError: (err) => notify(t(err?.message?.toString?.()))
	});

	/** setValue event */
	useEffect(() => {
		const ids = (localValue || [])?.map((user, i) => user?.id);
		setValue(name, ids);
		console.log(ids);
	}, [ localValue ]);

	/** Init users data */
	useEffect(() => {
		setLocalValue([]);
		for (const { login } of (initial || []))
			search.mutate(login);
	}, [ initial ]);

	return (
		<div className="border border-br px-4 py-2 rounded-2xl w-full focus-within:border-primary transition-colors">
			<p className="text-placeholder">{label}</p>
			<FormProvider {...methods}>
				<label className="group flex gap-2 items-center transition-colors">
					<BiSearchAlt2 className="text-xl group-focus-within:text-primary" />
					<Input
						{...methods.register("search")}
						placeholder={placeholder}
						className="border-0"
						disabled={search.isPending || disabled}
						onKeyPress={(e) => {
							if (!["Enter", ","].includes(e.key)) return;
							e.preventDefault();
							search.mutate(e?.target?.value);
						}}
					/>
				</label>
			</FormProvider>
			<div className="flex gap-4 flex-wrap">
				{localValue?.map?.((user: UserProps, i: number) => (
					<div
						className="flex gap-2 items-center p-2 pr-4 border border-br rounded-full w-fit cursor-pointer hover:animate-pulse hover:border-second hover:text-second"
						onClick={() => {
							if (search.isPending)
								return;

							setLocalValue((prev) => {
								return prev.filter((data) => data?.id != user?.id);
							});
						}}
					>
						<User
							login={user?.login}
							dataSource={user}
							size="small"
							nolink
						/>
						<BiX className="text-2xl" />
					</div>
				))}
			</div>
		</div>
	);
}

export default SelectUser;