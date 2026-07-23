import { useFormContext } from "react-hook-form";
import confOrder from "@/configs/selectors/order.json";
import confStatus from "@/configs/selectors/status.json";
import { useTranslation } from "react-i18next";
import { Select } from "@/components";
import { useMemo } from "react";

/**
 * DashboardFilterPictures
 * @description Filter panel for the pictures dashboard tab with status and sort options
 * @returns JSX element with pictures filter controls
 */
const DashboardFilterPictures: React.FC = () => {
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
				options={sortOptions}
				className="w-full"
				placeholder={t("dashboard.placeholders.order")}
				{...methods.register("sort")}
				allowClear
			/>
		</div>
	);
};

export default DashboardFilterPictures;
