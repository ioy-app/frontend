import { useFormContext } from "react-hook-form";
import confOrder from "@/configs/selectors/order.json";
import confTypesFilter from "@/configs/selectors/typesFilter.json";
import { useTranslation } from "react-i18next";
import { Select } from "@/components";
import { useMemo } from "react";

/**
 * DashboardFilterLikes
 * @description Filter panel for the likes dashboard tab with type and sort options
 * @returns JSX element with likes filter controls
 */
const DashboardFilterLikes: React.FC = () => {
	const methods = useFormContext();
	const { t } = useTranslation();

	const sortOptions = useMemo(() =>
		confOrder?.map?.((item) => ({
			...item,
			label: t(item?.label)
		})) || [],
	[ confOrder ]);

	return (
		<div className="grid grid-cols-2 gap-4">
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
			<Select
				options={sortOptions}
				className="w-full"
				placeholder={t("dashboard.placeholders.order")}
				{...methods.register("sort")}
				allowClear
			/>
		</div>
	);
};

export default DashboardFilterLikes;
