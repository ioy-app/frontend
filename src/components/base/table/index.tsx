import React from "react";
import Spin from "../spin";
import imgEmpty from "@/icons/empty.svg";
import { useTranslation } from "react-i18next";

/**
 * Table
 * @description Data table component with configurable columns, custom cell rendering, loading state, and empty data placeholder
 *
 * @param columns - Array of column definitions with title, dataIndex, and optional custom render function
 * @param data - Array of row data objects to display in the table
 * @param header - Optional React node rendered above the table
 * @param footer - Optional React node rendered below the table
 * @param control - Optional function returning action elements for each row (rendered in a right-aligned control column)
 * @param loading - Whether the table data is currently loading
 * @param nodata - Custom placeholder content when no data is available
 * @returns A bordered table with header, body rows, optional control column, and loading/empty states
 *
 * @example
 * <Table columns={columns} data={rows} loading={isLoading} control={(row) => <EditButton row={row} />} />
 */
const Table: React.FC<{
	/** Columns data */
	columns: {
		/** Column's title */
		title: React.ReactNode;
		/** Column's id */
		dataIndex: string;
		/** Column's custom render function */
		render?: (
			data: any,
			row: any,
			i: number,
		) => React.ReactNode;
	}[];
	/** Content */
	data?: any[];
	/** Header */
	header?: React.ReactNode;
	/** Footer */
	footer?: React.ReactNode;
	/** Control render */
	control?: (
		row: any,
		i: number
	) => React.ReactNode;
	/** Loading table */
	loading?: boolean;
	/** Nodata placeholder */
	nodata?: React.ReactNode;
}> = ({
	columns,
	data,
	header,
	footer,
	control,
	loading
}) => {
	const { t } = useTranslation();

	return (
		<div className="w-full border border-br rounded-xl text-default">
			{header && <div className="p-4">{header}</div>}
			<div className="w-full overflow-hidden overflow-x-auto">
				<Spin loading={loading}>
					{!data?.length ? (
						<div className="w-full flex justify-center items-center flex-col gap-2">
							<img
								src={imgEmpty}
								className="h-64 pointer-events-none select-none"
							/>
							<p className="text-placeholder text-2xl">{t("errors.nodata")}</p>
						</div>
					) : (
						<table className="w-full table-auto border-separate border-spacing-4 text-nowrap">
							<thead className="text-placeholder">
								<tr>
									{columns?.map((
									col,
									i
								) => (
										<td key={`${col.dataIndex}-${i}`}>
											<div>{col?.title}</div>
										</td>
									))}
									{control && <td key="control" />}
								</tr>
							</thead>
							<tbody>
								{data?.map((
								row,
								i
							) => {
									const keys = columns?.map(
										(col) => col?.dataIndex,
									);

									return (
										<tr key={i}>
											{keys?.map((
											col,
											j
										) => {
												const column = columns?.find(
													(column) => column.dataIndex == col,
												);
												if (
													column &&
													column?.render &&
													row?.[col]
												)
													return (
														<td key={j}>
															{column.render(
																row[col],
																row,
																i,
															) ?? "–"}
														</td>
													);

												return (
													<td key={j}>
														<div>{row[col] ?? "–"}</div>
													</td>
												);
											})}
											{control && (
												<td>
													<div className="flex justify-end items-center gap-4">
														{control(row, i)}
													</div>
												</td>
											)}
										</tr>
									);
								})}
							</tbody>
						</table>
					)}
				</Spin>
			</div>
			{footer && <div className="p-4">{footer}</div>}
		</div>
	);
}

export default Table;
