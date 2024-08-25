"use client"
import { useMemo } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ArrowDown, ArrowUp, Edit, EllipsisVertical, PackageOpen, Trash2 } from "lucide-react";
import { ColumnDef, FilterFn, RowData } from "@tanstack/react-table";

import Link from "next/link";
import { TAreaCultivoRow } from "@/schema/areacultivo.schema";
import { Button } from "@/components/ui/button";
import { formatDateToString } from "@/lib/utils";
import { BasicMenu } from "@/components/shared/menu";
import { FormModal } from "@/components/shared/modal";
import { useAreaCultivoStore } from "@/context/area/area-cultivo.store";
import { DataTable } from "@/components/shared/data-table";
import { HarvestForm } from "../form/recoleccion";
import { DeletePlantacionForm } from "../form/delete";
import { useTipoCultivoStore } from "@/context/tipoc";
import { useEnfermedadCultivoStore } from "@/context/enfermedad";

const columns: ColumnDef<TAreaCultivoRow>[] = [
  {
    accessorKey: "area",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Área
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
    cell: ({ row }) => <div>{row.original.area.name}</div>,
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
    accessorKey: "date_planted",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plantación
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
      const formatedDate = row.original.date_planted ? formatDateToString(row.original.date_planted) : ''
      return <div>{formatedDate}</div>
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "date_harved",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Recolección
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
      const formatedDate = row.original.date_harved ? formatDateToString(row.original.date_harved) : ''
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
              {!row.original.date_harved && <FormModal
                trigger={<Button className="link-menu">
                  <PackageOpen className="w-6 h-6" />
                  Recolectar
                </Button>}
                heading={<span>Recolección </span>}>
                <HarvestForm id={row.original.id} area={row.original.area.id} crop={row.original.crop.id} />
              </FormModal>}
              <DeletePlantacionForm id={row.original.id} />
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

const globalFilterFn: FilterFn<TAreaCultivoRow> = (row, columnId, filterValue, addMeta) => {
  const { area, crop, date_planted, date_harved } = row.original;
  const strPlanted = date_planted ? formatDateToString(date_planted) : '';
  const strHarved = date_harved ? formatDateToString(date_harved) : '';
  return (
    area.name.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    crop.name.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    strPlanted.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    strHarved.toLowerCase().includes(String(filterValue).toLowerCase())
  );
};

export function DataTablePlantaciones({cropId}:{cropId:number}) {
  const { areaCultivos, fetchingAreaCultivos } = useAreaCultivoStore();
  const data = useMemo(() => {
    return areaCultivos
      .filter(el=> el.crop.id === cropId)
      .map(el => ({
        ...el,
        date_planted: el.date_planted ? new Date(el.date_planted) : null,
        date_harved: el.date_harved ? new Date(el.date_harved) : null
      }));
  }, [areaCultivos]);

  return (
    <DataTable
      classNames={{
        container: "border-b table-scroll-horizontal",
        headerRow: "bg-[#F5F5EC] hover:bg-[#F5F5DC] tr-rounded overflow-hidden",
        headerCell: "h-[58px]",
      }}
      showHeader
      placeHolderSearch="Filtrar por código, estado, tipo, encargado, área ..."
      isLoading={fetchingAreaCultivos}
      data={data}
      columns={columns as ColumnDef<RowData>[]}
      globalFilterFn={globalFilterFn as FilterFn<RowData>}
    />
  );
}
