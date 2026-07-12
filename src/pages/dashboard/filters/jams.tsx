import { useFormContext } from "react-hook-form";
import confOrder from "@/configs/order.json";
import confJamsTypes from "../configs/jams.json";
import { useTranslation } from "react-i18next";
import { Select } from "@/components";
import { useMemo } from "react";

/**
 * Dashboard jams filters
 *
 * @example
 * <DashboardFilterJams />
*/
const DashboardFilterJams: React.FC = () => {
	const methods = useFormContext();
	const { t } = useTranslation();

	const sortOptions = useMemo(() =>
		confOrder?.map?.((item) => ({
			...item,
			label: t(item?.label)
		})) || [],
	[ confOrder ]);

	const jamsOptions = useMemo(() =>
		confJamsTypes?.map?.((item) => ({
			...item,
			label: t(item?.label)
		})) || [],
	[ confJamsTypes ]);

	return (
		<div className="grid grid-cols-2 gap-4">
			<Select
				options={jamsOptions}
				className="w-full"
				placeholder={t("dashboard.placeholders.jams.sort")}
				{...methods.register("jams")}
				isFirstOption
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

export default DashboardFilterJams;
