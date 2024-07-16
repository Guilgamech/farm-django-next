import {
	ColumnDef,
	FilterFnOption,
	PaginationState,
	RowData,
	SortingState,
	VisibilityState,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

const useDataTable = ({ data, columns, globalFilterFn }: { data: RowData[]; columns: ColumnDef<RowData>[]; globalFilterFn: FilterFnOption<RowData> }) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [globalFilter, setGlobalFilter] = useState("");
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	});
	const table = useReactTable({
		data,
		columns,
		globalFilterFn: globalFilterFn,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			globalFilter,
			pagination,
		},
	});
	return {
		table,
		sorting,
		setSorting,
		columnVisibility,
		setColumnVisibility,
		rowSelection,
		setRowSelection,
		globalFilter,
		setGlobalFilter,
		pagination,
		setPagination,
	};
};

export {
  useDataTable
}