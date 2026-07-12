import { useFormContext } from "react-hook-form";
import confOrder from "@/configs/order.json";
import confTypesFilter from "../configs/typesFilter.json";
import confStatus from "../configs/status.json";
import { useTranslation } from "react-i18next";
import { Select } from "@/components";
import { useMemo } from "react";

/**
 * Dashboard instances filters
 *
 * @example
 * <DashboardFilterInstances />
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
