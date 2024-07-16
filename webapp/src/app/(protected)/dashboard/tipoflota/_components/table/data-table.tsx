"use client"
import { useMemo } from "react"
import {
  CaretSortIcon,
} from "@radix-ui/react-icons"
import { ArrowDown, ArrowUp, Edit, EllipsisVertical } from "lucide-react"
import {
  ColumnDef,
  FilterFn,
  RowData,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/shared/data-table"
import { TTipoFlota } from "@/schema/tipof.schema"
import { useTipoFlotaStore } from "@/context/tipof"
import { BasicMenu } from "@/components/shared/menu"
import { FormModal } from "@/components/shared/modal"
import { TipoFlotaForm } from "../from/create"
import { DeleteTipoFlotaForm } from "../from/delete"

const columns: ColumnDef<TTipoFlota>[] = [
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
          {column.getIsSorted() === false ? (<CaretSortIcon className="h-4 w-4" />)
            : column.getIsSorted() === "asc" ? (<ArrowDown className="h-4 w-4" />) : (<ArrowUp className="h-4 w-4" />)}
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="">{row.getValue("name")}</div>
    ),
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
                  Editar
                </Button>}
                heading={<span>Editar Tipo De Flota Formulario</span>}>
                <TipoFlotaForm row={row.original} />
              </FormModal>
              <DeleteTipoFlotaForm row={row.original} />
            </div>}>
            <Button variant="option" size="icon">
              <EllipsisVertical className="w-6 h-6" />
            </Button>
          </BasicMenu>
        </div>
      )
    },
  },
]
const globalFilterFn: FilterFn<TTipoFlota> = (row, columnId, filterValue, addMeta) => {
  const { name} = row.original;

  return (name.toLowerCase().includes(String(filterValue).toLowerCase()))
}

export function DataTableTipoFlota() {
  const { tipoflotas, fetchingTipoFlotas } = useTipoFlotaStore()
  const data = useMemo(() => {
    return tipoflotas
  }, [tipoflotas])
  return <DataTable
    classNames={
      {
        container: "border-b table-scroll-horizontal",
        headerRow: "bg-[#F5F5EC] hover:bg-[#F5F5DC] tr-rounded overflow-hidden",
        headerCell: "h-[58px]"
      }
    }
    showHeader
    placeHolderSearch="Filtrar por código, nombre ..."
    isLoading={fetchingTipoFlotas}
    data={data}
    columns={columns as ColumnDef<RowData>[]}
    globalFilterFn={globalFilterFn as FilterFn<RowData>} />
}