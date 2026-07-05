import * as Icons from "@/icons";
import { FormProvider, useForm } from "react-hook-form";
import { Input, Button, Checkbox } from "@/components";
import { auth_reg } from "./api";
import { useNotify } from "@/hooks";
import { useTranslation } from "react-i18next";
import { paths } from "@/routes";
import { useMutation } from "@tanstack/react-query";

/**
 * Auth, reg form
*/
export default function Reg({ onClose }: { onClose?: () => void; }) {
	const methods = useForm();
	const { notify } = useNotify();
	const { t } = useTranslation();

	const submit = useMutation({
		mutationKey: [ "auth", "reg", "submit" ],
		mutationFn: async (data: {
			email: string;
			login: string;
		}) => (await auth_reg(data)),
		onError: (err) => notify(t(err?.message?.toString?.())),
		onSuccess: () => {
			notify(t("auth.reg"), "success");
			onClose && onClose?.();
		}
	});

	const terms = methods.watch("rules")

	return (
		<FormProvider {...methods}>
			<form
				className="flex flex-col gap-4 items-end w-full"
				onSubmit={methods.handleSubmit((data) => submit.mutate(data))}
			>
				<div className="flex flex-col gap-2 items-center w-full">
					<img src={Icons.Logo} className="w-25" />
					<p className="text-default">
						{t("auth.title.reg")}
					</p>
				</div>
				<Input
					label={t("auth.labels.login")}
					name="login"
					placeholder={t("auth.placeholders.login")}
					type="text"
					{...methods.register("login")}
					disabled={submit?.isPending}
				/>
				<Input
					label={t("auth.labels.email")}
					name="email"
					placeholder={t("auth.placeholders.email")}
					type="email"
					{...methods.register("email")}
					disabled={submit?.isPending}
				/>
				<div className="w-full flex justify-center">
					<Checkbox
						name="rules"
						disabled={submit?.isPending}
						placeholder={(
							<div className="flex flex-row gap-1 items-center">
								{t("auth.placeholders.rules")}
								<a
									href={paths.terms}
									target="_blank"
									rel="noreferrer"
								>
									<Button
										variant="text"
										className="text-primary"
									>
										{t("footer.terms")}
									</Button>
								</a>
							</div>
						)}
						{...methods.register("rules")}
					/>
				</div>	
				<Button
					variant="primary"
					htmlType="submit"
					disabled={!terms || submit?.isPending}
				>
					{t("buttons.create")}
				</Button>
			</form>
		</FormProvider>
	);
}
