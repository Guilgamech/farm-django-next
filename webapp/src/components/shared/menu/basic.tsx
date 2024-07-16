import { ReactNode } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils";

export const BasicMenu = ({children, menu, className}:{children:ReactNode; menu:ReactNode; className?:string})=>{
  return <Popover>
  <PopoverTrigger asChild>
    {children}
  </PopoverTrigger>
  <PopoverContent className={cn(className ?? "")} align="end">
    {menu}
  </PopoverContent>
</Popover>
}