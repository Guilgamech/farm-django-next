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
import { TArea } from "@/schema/area.schema"
import { useAreaStore } from "@/context/area"
import { BasicMenu } from "@/components/shared/menu"
import { FormModal } from "@/components/shared/modal"
import { AreaForm } from "../form/create"
import { DeleteAreaForm } from "../form/delete"

const columns: ColumnDef<TArea>[] = [
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
          {column.getIsSorted() === false ? (<CaretSortIcon className="h-4 w-4" />)
            : column.getIsSorted() === "asc" ? (<ArrowDown className="h-4 w-4" />) : (<ArrowUp className="h-4 w-4" />)}
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="">{row.getValue("code")}</div>
    ),
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
    accessorKey: "total_area",
    header: ({ column }) => {
      return (
        <Button
          variant="tableSort"
          size="tableSort"
          className="text-black fw-[700] text-[15px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Área Total
          {column.getIsSorted() === false ? (<CaretSortIcon className="h-4 w-4" />)
            : column.getIsSorted() === "asc" ? (<ArrowDown className="h-4 w-4" />) : (<ArrowUp className="h-4 w-4" />)}
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("total_area")}</div>,
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
                heading={<span>Editar Área </span>}>
                <AreaForm row={row.original} />
              </FormModal>
              <DeleteAreaForm row={row.original} />
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
const globalFilterFn: FilterFn<TArea> = (row, columnId, filterValue, addMeta) => {
  const { code, name, total_area } = row.original;
  const strTotalArea = `${total_area}`
  return (strTotalArea.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    code.toLowerCase().includes(String(filterValue).toLowerCase()) ||
    name.toLowerCase().includes(String(filterValue).toLowerCase())
  )
}

export function DataTableArea() {
  const { areas, fetchingAreas } = useAreaStore()
  const data = useMemo(() => {
    return areas
  }, [areas])
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
    isLoading={fetchingAreas}
    data={data}
    columns={columns as ColumnDef<RowData>[]}
    globalFilterFn={globalFilterFn as FilterFn<RowData>} />
}