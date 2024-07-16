"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"

export default function Notifications() {
  return <div className="flex">
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <span className="relative z-10"><Bell className="text-primary h-8 w-8 p-1" /></span>
        <span className="absolute top-[-12px] right-[-12px] bg-primary text-white rounded-lg px-2 text-[12px] flex justify-center items-center -z-1">
          2
        </span>
        <span className="sr-only">Notifications</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-primary">
        <DropdownMenuLabel className="text-center text-primary">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary" />
        <DropdownMenuItem className="flex flex-col gap-1 cursor-pointer hover:!bg-primary hover:!text-white focus:!bg-primary focus:!text-white">
          <h3 className="w-full font-semibold ">Notification Title</h3>
          <p className="w-full text-sm">Message of Notificaction</p>
        </DropdownMenuItem>        
        <DropdownMenuItem className="flex flex-col gap-1 cursor-pointer hover:!bg-primary hover:!text-white focus:!bg-primary focus:!text-white">
          <h3 className="w-full font-semibold">Notification Title</h3>
          <p className="w-full text-sm">Message of Notificaction</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}