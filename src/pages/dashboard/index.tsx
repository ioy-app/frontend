import confTabs from "./configs/tabs.json";
import * as Components from "@/components";
import Instances from "./content/instances";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreProps } from "@/stories";
import { useTranslation } from "react-i18next";
import { BiChevronsLeft } from "react-icons/bi";
import { paths } from "@/routes";
import Jams from "./content/jams";
import { FEATURE_JAMS } from "@/features";
import Following from "./content/following";
import Likes from "./content/likes";
import Reports from "./content/reports";
import { useEffect, useMemo } from "react";
import AIReports from "./content/ai_reports";
import DashboardFilters from "./components/filter";

/**
 * Dashboard
 * @description Admin dashboard with tabbed content for instances, jams, following, likes, reports, and AI reports
 * @returns JSX element with tabbed dashboard layout and filters
 */
export default function Dashboard() {
	const { t } = useTranslation();
	const params = useParams();
	const tab = params?.tab;
	const navigate = useNavigate();
	const { login, roledata } = useSelector((state: StoreProps) => state.login);

	const tabs = useMemo(() =>
		confTabs.map((record) => ({
				...record,
				label: (
					<NavLink to={`${paths.dashboard.list}/${record.value}`}>
						{t(record.label)}
					</NavLink>
				)
			})).filter((item) => {
				if (item.value == "jams" && !FEATURE_JAMS)
					return false;

				if (item.value == "reports" && !roledata.is_view_reports)
					return false;

				if (item.value == "ai_reports" && !roledata.is_view_reports)
					return false;

				return true;
			})
	, [ roledata ]);

	useEffect(() => {
		document.title = t(`dashboard.tabs.${tab && tab || "instances"}`);
	}, [ t, tab ]);

	return (
		<div className="flex-1 p-4">
			<DashboardFilters
				tab={tab}
				key={tab}
			/>
			<Components.Tabs
				headers={tabs}
				value={tab}
				onChange={(tab) => navigate(`${paths.dashboard.list}/${tab}`)}
				content={{
					instances: <Instances />,
					jams: <Jams />,
					following: <Following />,
					likes: <Likes />,
					reports: <Reports />,
					ai_reports: <AIReports />
				}}
			/>
		</div>
	);
}
