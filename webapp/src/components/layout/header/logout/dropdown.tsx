"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { ReactNode } from "react";

export default function DropdownMenuItemLogout({children}:{children:ReactNode}){
  return <DropdownMenuItem className="relative cursor-pointer flex items-center gap-2 border-none px-4 text-sm rounded-sm font-semibold py-2 text-primary  hover:!bg-primary hover:!text-white focus:!bg-primary focus:!text-white" onClick={()=>{
    const currentForm = document.querySelector("form.form-account-logout");
    if(currentForm instanceof HTMLFormElement){
      try {
        currentForm.requestSubmit()
      } catch (error) {
        try {
          currentForm.submit()
        } catch (error) {          
        }
      }      
    }
  }}>
    <LogOut className="w-5 h-5" />
    <span className="translate-y-[1px]">Cerrar Seccion</span>
    {children}
  </DropdownMenuItem>
}
