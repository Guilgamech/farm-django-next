"use client"
import { Table, TableBody, TableRow, TableCell, TableHeader, TableHead } from "@/components/ui/table"
import { TableSearch } from "./search"
import { TablePagination } from "./pagination"
import { ColumnDef, FilterFnOption, RowData, flexRender } from "@tanstack/react-table";
import { useDataTable } from "./hook";
import { Loader } from "lucide-react";
import { classNames } from "@react-pdf-viewer/core";
import { cn } from "@/lib/utils";


const DataTable = ({
  data,
  columns,
  globalFilterFn,
  isLoading,
  showHeader = false,
  placeHolderSearch,
  classNames = {
    container: "",
    headerRow: "",
    headerCell: "",
    bodyRow: "",
    bodyCell: ""
  }
}: {
  data: RowData[];
  columns: ColumnDef<RowData>[];
  globalFilterFn: FilterFnOption<RowData>
  isLoading: boolean,
  showHeader?: boolean
  placeHolderSearch?: string
  classNames?: {
    container?: string;
    headerRow?: string;
    headerCell?: string;
    bodyRow?: string;
    bodyCell?: string;
  }
}) => {
  const { table, globalFilter, setGlobalFilter, pagination, setPagination } = useDataTable({ data, columns, globalFilterFn })
  return <div className="w-full">
    <TableSearch globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} placeHolder={placeHolderSearch} />
    <div className={cn(
      classNames.container && classNames.container
    )}>
      <Table>
        {showHeader && <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}
              className={cn(
                classNames.headerRow && classNames.headerRow
              )}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}
                    className={cn(
                      classNames.headerCell && classNames.headerCell
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  classNames.bodyRow && classNames.bodyRow
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn(
                    classNames.bodyCell && classNames.bodyCell
                  )}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                {isLoading ? (<p className="flex gap-2 justify-center items-center">
                  <Loader className="h-5 w-5 slow-spin" />
                  <span>Loading Data</span>
                </p>)
                  : (<span className="text-md font-medium">No Results</span>)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    {table.getPageCount() > 1 &&
      <TablePagination table={table} pagination={pagination} setPagination={setPagination} />}
  </div>
}

export {
  DataTable
}