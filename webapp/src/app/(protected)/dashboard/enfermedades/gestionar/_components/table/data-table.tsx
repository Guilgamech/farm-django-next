"use client"
import { useMemo } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ArrowDown, ArrowUp, Edit, EllipsisVertical } from "lucide-react";
import { ColumnDef, FilterFn, RowData } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { TEnfermedadRead } from "@/schema/enfermedad.schema"; // Asegúrate de tener el esquema correcto para Enfermedad
import { useEnfermedadStore } from "@/context/enfermedad"; // Importa el contexto y el hook adecuadamente
import { BasicMenu } from "@/components/shared/menu";
import { FormModal } from "@/components/shared/modal";
import { DeleteEnfermedadForm } from "../form/delete";
import { EnfermedadForm } from "../form/create";

const columns: ColumnDef<TEnfermedadRead>[] = [
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
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
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
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "type_crops",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo De Cultivo
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
    cell: ({ row }) => <div>{row.original.type_crops.name}</div>,
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
                heading={<span>Editar Enfermedad </span>}>
                <EnfermedadForm row={row.original} />
              </FormModal>
              <DeleteEnfermedadForm row={row.original} />
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

const globalFilterFn: FilterFn<TEnfermedadRead> = (row, columnId, filterValue, addMeta) => {
  const {  name, category, type_crops } = row.original;

  return (
    name.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    category.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    type_crops.name.toLowerCase().includes(String(filterValue).toLowerCase())
  );
};

export function DataTableEnfermedad() {
  const { enfermedades, fetchingEnfermedades } = useEnfermedadStore();
  const data = useMemo(() => {
    return enfermedades;
  }, [enfermedades]);

  return (
    <DataTable
      classNames={{
        container: "border-b table-scroll-horizontal",
        headerRow: "bg-[#F5F5EC] hover:bg-[#F5F5DC] tr-rounded overflow-hidden",
        headerCell: "h-[58px]",
      }}
      showHeader
      placeHolderSearch="Filtrar por código, estado, tipo, encargado, área ..."
      isLoading={fetchingEnfermedades}
      data={data}
      columns={columns as ColumnDef<RowData>[]}
      globalFilterFn={globalFilterFn as FilterFn<RowData>}
    />
  );
}
