import { useFormContext } from "react-hook-form";
import confOrder from "@/configs/selectors/order.json";
import confTypesFilter from "@/configs/selectors/typesFilter.json";
import confStatus from "@/configs/selectors/status.json";
import { useTranslation } from "react-i18next";
import { Select } from "@/components";
import { useMemo } from "react";

/**
 * DashboardFilterInstances
 * @description Filter panel for the instances dashboard tab with status, type, and sort options
 * @returns JSX element with instances filter controls
 */
const DashboardFilterInstances: React.FC = () => {
	const methods = useFormContext();
	const { t } = useTranslation();

	const sorOptions = useMemo(() =>
		confOrder?.map?.((item) => ({
			...item,
			label: t(item?.label)
		})) || [],
	[ confOrder ]);

	return (
		<div className="grid grid-cols-2 gap-4">
			<Select
				placeholder={t("dashboard.placeholders.status")}
				options={confStatus.map((record) => ({
					...record,
					label: t(record.label),
				}))}
				{...methods.register("status")}
				className="w-full"
				allowClear
			/>
			<Select
				placeholder={t("dashboard.placeholders.type")}
				options={confTypesFilter.map((record) => ({
					...record,
					label: t(record.label),
				}))}
				{...methods.register("type")}
				className="w-full"
				allowClear
			/>
			<div className="col-span-2">
				<Select
					options={sorOptions}
					className="w-full"
					placeholder={t("dashboard.placeholders.order")}
					{...methods.register("sort")}
					allowClear
				/>
			</div>
		</div>
	);
};

export default DashboardFilterInstances;
