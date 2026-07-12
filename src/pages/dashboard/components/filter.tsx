import { Button, Input } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
	BiChevronRight,
	BiChevronUp,
	BiFilter,
	BiSearchAlt2,
	BiX
} from "react-icons/bi";
import DashboardFilterInstances from "../filters/instances";
import DashboardFilterJams from "../filters/jams";
import DashboardFilterFollowing from "../filters/following";
import DashboardFilterLikes from "../filters/likes";
import DashboardFilterPictures from "../filters/pictures";
import { useForm, FormProvider } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useNotify } from "@/hooks";

/**
 * Filters for dashboard
 *
 * @example
 * <DashboardFilters tab="instances" />
*/
const DashboardFilters: React.FC<{
	tab?: string;
}> = ({
	tab
}) => {
	const [ isOpen, setOpen ] = useState<boolean>(false);
	const [ isOpenFilters, setOpenFilters ] = useState<boolean>(false);
	const { t } = useTranslation();
	const [ searchParams, setSearchParams ] = useSearchParams();
	const { notify } = useNotify();
	const methods = useForm();

	/** Submit filters */
	const submit = useMutation({
		mutationKey: [ "dashboard", tab, "filters", "submit" ],
		mutationFn: async (data: Record<string, unknown>) => {
			const us = new URLSearchParams();
			for (const [ key, value ] of Object.entries(data || {})) {
				if (!value)
					continue;

				us.set(key, String(value));
			}

			return us;
		},
		onSuccess: (us: URLSearchParams) => setSearchParams(us),
		onError: (err) => notify(err?.message?.toString?.() || err)
	});

	const queryFilters = useMemo(() => {
		const data: Record<string, string> = {};
		for (const [ key, value ] of searchParams?.entries?.()) {
			if (key == "page")
				continue;

			data[key] = value;
		}

		return data;
	}, [ searchParams, tab ]);
	const isFilter = useMemo(() => !!Object.keys(queryFilters)?.length, [ queryFilters ]);

	useEffect(() => {
		const fields = methods.getValues();
		for (const [ key, _ ] of Object.entries(fields || {}))
			methods.setValue(key, queryFilters?.[key] ? queryFilters?.[key] : undefined);
	}, [ queryFilters ]);

	const hasFilters = useMemo(() => [
		"instances",
		"jams",
		"following",
		"likes",
		"pictures"	
	].includes(tab) || !tab, [ tab ]);
	const RenderFilters = useMemo(() => {
		switch (tab) {
			case "instances": return DashboardFilterInstances;
			case "jams": return DashboardFilterJams;
			case "following": return DashboardFilterFollowing;
			case "likes": return DashboardFilterLikes;
			case "pictures": return DashboardFilterPictures;
			default: return DashboardFilterInstances;
		}
	}, [ tab ]);
	
	if (!hasFilters)
		return null;

	return (
			<div
				className={`flex gap-2 items-center flex-col justify-end bg-back z-10 border border-br fixed right-6 top-6 ${isOpen && "rounded-3xl" || "rounded-full"}`}
			>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit((data) => submit.mutate(data))}>
						<div className={`flex gap-2 items-center justify-end transition-all flex-row-reverse rounded-full p-1 ${isOpenFilters && "rounded-t-3xl" || ""}`}>
							<AnimatePresence
								mode="wait"
								initial={false}
							>
								<motion.div
									key={isOpen ? "opened" : "closed"}
									initial={{
										rotate: "180deg",
										scale: .5
									}}
									animate={{
										rotate: "0deg",
										scale: 1
									}}
									exit={{
										rotate: "180deg",
										scale: .5
									}}
									transition={{
										duration: .15
									}}
								>
									<Button
										variant="default"
										type="circle"
										onClick={() => {
											if (!isOpenFilters)
												setOpen((prev) => !prev);
											else
												setOpenFilters(false);
										}}
										className={`${isOpen && "border-0 border-l! border-l-br!" || "border-0!"}`}
									>
										{!isOpen ? <BiSearchAlt2 /> : <BiChevronRight />}
									</Button>	
								</motion.div>
							</AnimatePresence>
							<AnimatePresence
								mode="wait"
								initial={false}
							>
								<motion.div
									className="absolute -right-5 -top-5"
									key="clear"
									initial={{
										scale: 0
									}}
									animate={{
										scale: isFilter ? 1 : 0
									}}
									exit={{
										scale: 0
									}}
								>
									<Button
										type="circle"
										variant="danger"
										className="p-0! aspect-square text-xl"
										onClick={() => submit?.mutate()}
									>
										<BiX />
									</Button>
								</motion.div>
							</AnimatePresence>
							<AnimatePresence mode="wait">
								{isOpen && (
									<motion.div
										initial={{
											width: 0
										}}
										animate={{
											width: "fit-content"
										}}
										exit={{
											width: 0
										}}
										className="flex flex-row gap-2 items-center"
									>
										<Input
											{...methods.register("search")}
											placeholder={t("dashboard.placeholders.search")}
											className="border-none"
										/>
										<motion.div
											initial={{
												scale: 0
											}}
											animate={{
												scale: 1
											}}
											exit={{
												scale: 0,
												transition: {
													delay: 0
												}
											}}
											transition={{
												duration: .15,
												delay: .15
											}}
										>
											<Button 
												variant="primary"
												type="circle"
												htmlType="submit"
											>
												<BiSearchAlt2 />
											</Button>
										</motion.div>
										<motion.div
											initial={{
												scale: 0
											}}
											animate={{
												scale: 1
											}}
											exit={{
												scale: 0,
												transition: {
													delay: 0
												}
											}}
											transition={{
												duration: .15,
												delay: .25
											}}
											className="relative"
										>
											<Button
												type="circle"
												onClick={() => setOpenFilters((prev) => !prev)}
											>
												<motion.div
													key={isOpenFilters ? "filters" : "closed-filters"}
													initial={{
														rotate: "180deg",
														scale: .5
													}}
													animate={{
														rotate: "0deg",
														scale: 1
													}}
													exit={{
														rotate: "180deg",
														scale: .5
													}}
													transition={{
														duration: .15
													}}
												>
													{isOpenFilters ? <BiChevronUp /> : <BiFilter />}
												</motion.div>
											</Button>
										</motion.div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
						<AnimatePresence mode="wait">
							{isOpenFilters && hasFilters && (
								<>
									<motion.div
										initial={{
											height: 0
										}}
										animate={{
											height: "fit-content"
										}}
										exit={{
											paddingTop: 0,
											height: 0,
										}}
										transition={{
											duration: .25
										}}
										className="w-full h-full overflow-hidden"
									>
										<div className="p-4 pt-2 w-full">
											<RenderFilters />
										</div>
									</motion.div>	
								</>
							)}
						</AnimatePresence>
					</form>
				</FormProvider>
			</div>
	);
}

export default DashboardFilters;
