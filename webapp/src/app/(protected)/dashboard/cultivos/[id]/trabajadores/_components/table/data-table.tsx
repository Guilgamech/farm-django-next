"use client"
import { useMemo } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ArrowDown, ArrowUp, Edit, EllipsisVertical, PackageOpen, Trash2 } from "lucide-react";
import { ColumnDef, FilterFn, RowData } from "@tanstack/react-table";

import Link from "next/link";
import { TAgricolaCultivoRow } from "@/schema/agricolacultivo.schema";
import { Button } from "@/components/ui/button";
import { formatDateToString } from "@/lib/utils";
import { BasicMenu } from "@/components/shared/menu";
import { FormModal } from "@/components/shared/modal";
import { useAgricolaCultivoStore } from "@/context/agricola/agricola-cultivo.store";
import { DataTable } from "@/components/shared/data-table";

import { DeleteTrabajadorForm } from "../form/delete";

const columns: ColumnDef<TAgricolaCultivoRow>[] = [
  {
    accessorKey: "worker",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trabajadores
          {column.getIsSorted() === false ? (
            <CaretSortIcon className="h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.worker.name}</div>,
  },
  {
    accessorKey: "crop",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cultivos
          {column.getIsSorted() === false ? (
            <CaretSortIcon className="h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.crop.name}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <BasicMenu className="bg-white border-primary w-fit p-0"
            menu={<div className="flex flex-col gap-2 p-1">
              <DeleteTrabajadorForm id={row.original.id} />
            </div>}>
            <Button variant="option" size="icon">
              <EllipsisVertical className="w-6 h-6" />
            </Button>
          </BasicMenu>
        </div>
      )
    },
  },
];

const globalFilterFn: FilterFn<TAgricolaCultivoRow> = (row, columnId, filterValue, addMeta) => {
  const { worker, crop  } = row.original;
  return (
    worker.name.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    crop.name.toLowerCase().includes(String(filterValue).toLowerCase())
  );
};


export function DataTableTrabajadores({cropId}:{cropId:number}) {
  const { agricolaCultivos, fetchingAgricolaCultivos } = useAgricolaCultivoStore();
  const data = useMemo(() => {
    return agricolaCultivos
    .filter(el=> el.crop.id === cropId)
    .map(el => ({
      ...el,
    }));
  }, [agricolaCultivos]);
  return (
    <DataTable
      classNames={{
        container: "border-b table-scroll-horizontal",
        headerRow: "bg-[#F5F5EC] hover:bg-[#F5F5DC] tr-rounded overflow-hidden",
        headerCell: "h-[58px]",
      }}
      showHeader
      placeHolderSearch="Filtrar por código, estado, tipo, encargado, área ..."
      isLoading={fetchingAgricolaCultivos}
      data={data}
      columns={columns as ColumnDef<RowData>[]}
      globalFilterFn={globalFilterFn as FilterFn<RowData>}
    />
  );
}
