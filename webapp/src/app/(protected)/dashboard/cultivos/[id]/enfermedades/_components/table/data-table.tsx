"use client"
import { useMemo } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ArrowDown, ArrowUp, Edit, EllipsisVertical, Cross, Trash2 } from "lucide-react";
import { ColumnDef, FilterFn, RowData } from "@tanstack/react-table";

import Link from "next/link";
import { TEnfermedadCultivoRow } from "@/schema/enfermedadcultivo.schema";
import { Button } from "@/components/ui/button";
import { formatDateToString } from "@/lib/utils";
import { BasicMenu } from "@/components/shared/menu";
import { FormModal } from "@/components/shared/modal";
import { useEnfermedadCultivoStore } from "@/context/enfermedad/enfermedad-cultivo.store";
import { DataTable } from "@/components/shared/data-table";
import { CureForm } from "../form/tratamiento";
import { DeleteDiseaseForm } from "../form/delete";

const columns: ColumnDef<TEnfermedadCultivoRow>[] = [
  {
    accessorKey: "disease",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enfermedad
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
    cell: ({ row }) => <div>{row.original.disease.name}</div>,
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
          Cultivo
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
    accessorKey: "manager",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Encargado
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
    cell: ({ row }) => <div>{row.original.manager.name}</div>,
  },
  {
    accessorKey: "treatment",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tratamiento
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
    cell: ({ row }) => <div>{row.original.treatment.name}</div>,
  },
  {
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Grado
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
    cell: ({ row }) => <div>{row.original.grade}</div>,
  },
  {
    accessorKey: "start",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Inicio De La Enfermedad
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
    cell: ({ row }) => {
      const formatedDate = row.original.start ? formatDateToString(row.original.start) : ''
      return <div>{formatedDate}</div>
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "end",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fin Del Tratamiento
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
    cell: ({ row }) => {
      const formatedDate = row.original.end ? formatDateToString(row.original.end) : ''
      return <div>{formatedDate}</div>
    },
    sortingFn: "datetime",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <BasicMenu className="bg-white border-primary w-fit p-0"
            menu={<div className="flex flex-col gap-2 p-1">
              {!row.original.end && <FormModal
                trigger={<Button className="link-menu">
                  <Cross className="w-6 h-6" />
                  Tratar Enfermedad
                </Button>}
                heading={<span>Tratar Enfermedad </span>}>
                <CureForm id={row.original.id} disease={row.original.disease.id} crop={row.original.crop.id} />
              </FormModal>}
              <DeleteDiseaseForm id={row.original.id} />
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

const globalFilterFn: FilterFn<TEnfermedadCultivoRow> = (row, columnId, filterValue, addMeta) => {
  const { disease, crop, start, end } = row.original;
  const strStart = start ? formatDateToString(start) : '';
  const strEnd = end ? formatDateToString(end) : '';
  return (
    disease.name.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    crop.name.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    strStart.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    strEnd.toLowerCase().includes(String(filterValue).toLowerCase())
  );
};

export function DataTableDisease({cropId}:{cropId:number}) {
  const { enfermedadCultivos, fetchingEnfermedadCultivos } = useEnfermedadCultivoStore();
  const data = useMemo(() => {
    return enfermedadCultivos
    .filter(el=> el.crop.id === cropId)
    .map(el => ({
      ...el,
      start: el.start ? new Date(el.start) : null,
      end: el.end ? new Date(el.end) : null
    }));
  }, [enfermedadCultivos]);

  return (
    <DataTable
      classNames={{
        container: "border-b table-scroll-horizontal",
        headerRow: "bg-[#F5F5EC] hover:bg-[#F5F5DC] tr-rounded overflow-hidden",
        headerCell: "h-[58px]",
      }}
      showHeader
      placeHolderSearch="Filtrar por código, estado, tipo, encargado, área ..."
      isLoading={fetchingEnfermedadCultivos}
      data={data}
      columns={columns as ColumnDef<RowData>[]}
      globalFilterFn={globalFilterFn as FilterFn<RowData>}
    />
  );
}
