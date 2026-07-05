import React, { useState } from "react";
import * as Icons from "@/icons";
import { Input, Button, Code } from "@/components";
import { useDispatch } from "react-redux";
import { setLogin } from "@/stories/login";
import { auth_login } from "./api";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { useNotify } from "@/hooks";
import { useMutation } from "@tanstack/react-query";

/**
 * Auth, login form
*/
const Login: React.FC<{ onClose: () => void; }> = ({ onClose }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { notify } = useNotify();
	const methods = useForm();
	const [ isCodeForm, setFormCode ] = useState<boolean>(false);

	/** Submit login form */
	const submit = useMutation({
		mutationKey: [ "auth", "login", "submit" ],
		mutationFn: async (email: string) => await auth_login(email),
		onSuccess: () => setFormCode(true),
		onError: (err) => notify?.("auth." + err?.message?.toString?.())
	});

	/** Verify auth code */
	const verify = useMutation({
		mutationKey: [ "auth", "login", "verify" ],
		mutationFn: async (data: Record<string, unknown>) => {
			dispatch(setLogin(data));
			return data?.login;
		},
		onSuccess: (login: string) => {
			notify(t("auth.welcome", { login }), "success");
			onClose && onClose?.();
		}
	});

	if (isCodeForm)
		return (
			<Code
				onSubmit={(data) => verify.mutate(data)}
				onCancel={() => setFormCode(false)}
			/>
		);

	return (
		<FormProvider {...methods}>
			<form
				className="flex flex-col gap-4 items-end w-full"
				onSubmit={methods.handleSubmit(({ email }: { email: string }) => submit.mutate(email))}
			>
				<div className="flex flex-col gap-2 items-center w-full">
					<img src={Icons.Logo} className="w-25" />
					<p className="text-default">
						{t("auth.title.login")}
					</p>
				</div>
				<Input
					{...methods.register("email")}
					label={t("auth.labels.email")}
					placeholder={t("auth.placeholders.email")}
					type="email"
					disabled={submit.isPending}
				/>
				<Button
					disabled={submit.isPending}
					variant="primary"
					htmlType="submit"
				>
					{t("buttons." + (submit.isPending ? "loading" : "ok"))}
				</Button>
			</form>
		</FormProvider>
	);
}

export default Login;
