import {
	NavLink,
	Outlet
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import imgLabel from "@/icons/label.svg";
import { Button, Game, Picture, Spin } from "@/components";
import { paths } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/api";
import { useMemo } from "react";

/**
 * Home
 * @description Main home page layout with outlet for nested routes
 *
 * @returns Main home page component
 *
 * @example
 * <Home />
 */
export default function Home() {
	return (
		<div className="flex flex-col gap-4 w-full">
			<div className="w-full flex gap-4 flex-1 h-full max-md:flex-col">
				<div className="col-span-12 flex flex-col gap-4 flex-1 h-full w-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
