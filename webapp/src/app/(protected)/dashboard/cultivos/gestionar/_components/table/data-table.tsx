"use client"
import { useMemo } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ArrowDown, ArrowUp, Edit, EllipsisVertical, TreePine } from "lucide-react";
import { ColumnDef, FilterFn, RowData } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { TCultivoRead } from "@/schema/cultivo.schema"; // Asegúrate de tener el esquema correcto para Cultivo
import { useCultivoStore } from "@/context/cultivo"; // Importa el contexto y el hook adecuadamente
import { BasicMenu } from "@/components/shared/menu";
import { FormModal } from "@/components/shared/modal";
import { CultivoForm } from "../form/create";
import { DeleteCultivoForm } from "../form/delete";
import Link from "next/link";

const columns: ColumnDef<TCultivoRead>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
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
    cell: ({ row }) => <div>{row.getValue("code")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
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
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
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
    cell: ({ row }) => <div>{row.original.type.name}</div>,
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
          Jefe De Brigada
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <BasicMenu className="bg-white border-primary w-fit p-0"
            menu={<div className="flex flex-col gap-2 p-1">
              <Link href={`/dashboard/cultivos/${row.original.id}`} className="link-menu">
                <TreePine className="w-6 h-6" />
                Detalles
              </Link>
              <FormModal
                trigger={<Button className="link-menu">
                  <Edit className="w-6 h-6" />
                  Edit
                </Button>}
                heading={<span>Editar Cultivo </span>}>
                <CultivoForm row={row.original} />
              </FormModal>
              <DeleteCultivoForm row={row.original} />
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

const globalFilterFn: FilterFn<TCultivoRead> = (row, columnId, filterValue, addMeta) => {
  const { code, status, type, manager } = row.original;

  return (
    code.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    status.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    type.name.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    manager.name.toLowerCase().includes(String(filterValue).toLowerCase())
  );
};

export function DataTableCultivo() {
  const { cultivos, fetchingCultivos } = useCultivoStore();
  const data = useMemo(() => {
    return cultivos;
  }, [cultivos]);

  return (
    <DataTable
      classNames={{
        container: "border-b table-scroll-horizontal",
        headerRow: "bg-[#F5F5EC] hover:bg-[#F5F5DC] tr-rounded overflow-hidden",
        headerCell: "h-[58px]",
      }}
      showHeader
      placeHolderSearch="Filtrar por código, estado, tipo, encargado, área ..."
      isLoading={fetchingCultivos}
      data={data}
      columns={columns as ColumnDef<RowData>[]}
      globalFilterFn={globalFilterFn as FilterFn<RowData>}
    />
  );
}
