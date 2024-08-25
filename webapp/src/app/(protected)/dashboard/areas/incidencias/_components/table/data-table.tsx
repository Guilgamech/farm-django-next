"use client"
import { useMemo } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ArrowDown, ArrowUp, Edit, EllipsisVertical } from "lucide-react";
import { ColumnDef, FilterFn, RowData } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { TIncidenciaRead } from "@/schema/incidencia.schema"; // Asegúrate de tener el esquema correcto para Incidencia
import { useIncidenciaStore } from "@/context/incidencia"; // Importa el contexto y el hook adecuadamente
import { BasicMenu } from "@/components/shared/menu";
import { FormModal } from "@/components/shared/modal";
import { DeleteIncidenciaForm } from "../form/delete";
import { IncidenciaForm } from "../form/create";
import { formatDateToString } from "@/lib/utils";

const columns: ColumnDef<TIncidenciaRead>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
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
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
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
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
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
      const dateValue = new Date(row.original.date); // Convertir a objeto Date
      const formattedDate = !isNaN(dateValue.getTime()) ? formatDateToString(dateValue) : '';
      return <div>{formattedDate}</div>;
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "damage",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Daño
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
    cell: ({ row }) => <div>{row.getValue("damage")}</div>,
  },
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <BasicMenu className="bg-white border-primary w-fit p-0"
            menu={<div className="flex flex-col gap-2 p-1">
              <FormModal
                trigger={<Button className="link-menu">
                  <Edit className="w-6 h-6" />
                  Edit
                </Button>}
                heading={<span>Editar Incidencia </span>}>
                <IncidenciaForm row={row.original} />
              </FormModal>
              <DeleteIncidenciaForm row={row.original} />
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

const globalFilterFn: FilterFn<TIncidenciaRead> = (row, columnId, filterValue, addMeta) => {
  const { type, damage, date, status, area } = row.original;

  return (
    damage.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    status.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    type.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    date.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    area.name.toLowerCase().includes(String(filterValue).toLowerCase())
  );
};

export function DataTableIncidencia() {
  const { incidencias, fetchingIncidencias } = useIncidenciaStore();
  const data = useMemo(() => {
    return incidencias;
  }, [incidencias]);

  return (
    <DataTable
      classNames={{
        container: "border-b table-scroll-horizontal",
        headerRow: "bg-[#F5F5EC] hover:bg-[#F5F5DC] tr-rounded overflow-hidden",
        headerCell: "h-[58px]",
      }}
      showHeader
      placeHolderSearch="Filtrar por código, estado, tipo, encargado, área ..."
      isLoading={fetchingIncidencias}
      data={data}
      columns={columns as ColumnDef<RowData>[]}
      globalFilterFn={globalFilterFn as FilterFn<RowData>}
    />
  );
}
