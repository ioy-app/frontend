import { useTranslation } from "react-i18next";
import Login from "./login";
import Reg from "./reg";
import { Button, Tabs } from "@/components";
import { BiX } from "react-icons/bi";

/**
 * Auth content
*/
const Auth: React.FC<{ onClose: () => void; }> = ({ onClose }) => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col gap-4 justify-center items-center w-full">	
			<Tabs
				headers={[
					{
						label: t("buttons.login"),
						value: "login",
					},
					{
						label: t("buttons.reg"),
						value: "reg",
					},
				]}
				ContentParent={({
					children,
				}: {
					children: React.ReactNode;
				}) => (
					<div className="auth_content">{children}</div>
				)}
				content={{
					login: <Login onClose={onClose} />,
					reg: <Reg onClose={onClose} />,
				}}
				extra={(
					<Button
						onClick={() => onClose && onClose()}
						variant="text"
						className="text-2xl"
					>
						<BiX />
					</Button>
				)}
			/>
		</div>
	);
};

export default Auth;
export { Login, Reg };
