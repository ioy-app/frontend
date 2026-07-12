import { useFormContext } from "react-hook-form";
import confOrder from "@/configs/selectors/order.json";
import { useTranslation } from "react-i18next";
import { Select } from "@/components";
import { useMemo } from "react";

/**
 * Dashboard following filters
 *
 * @example
 * <DashboardFilterFollowing />
*/
const DashboardFilterFollowing: React.FC = () => {
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
			<div className="col-span-2">
				<Select
					options={sortOptions}
					className="w-full"
					placeholder={t("dashboard.placeholders.order")}
					{...methods.register("sort")}
					allowClear
				/>
			</div>
		</div>
	);
};

export default DashboardFilterFollowing;
