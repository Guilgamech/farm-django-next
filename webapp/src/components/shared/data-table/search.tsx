import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const TableSearch = ({
  globalFilter,
  placeHolder,
  setGlobalFilter
}: {
  globalFilter: string;
  placeHolder?: string
  setGlobalFilter: (value: string) => void
}) => {
  return <div className="flex items-center py-4 relative border-b">
    <Input
      placeholder={placeHolder ?? "Filtrar ..."}
      value={globalFilter}
      onChange={event => {
        setGlobalFilter(event.target.value)
      }}
      className="h-[58px] fw-[700] text-[14px] text-[#5B7556] placeholder:text-[#5B7556] rounded-[15px] pt-[10px] pl-[20px] pr-[10px]"
    />
    <div className="absolute right-[10px] bg-[#789C74] rounded w-[38px] h-[38px] flex justify-center items-center">
      <Search className="h-6 w-6 text-white" />
    </div>
  </div>
}
export {
  TableSearch
}