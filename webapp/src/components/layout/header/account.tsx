import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/session";
import { ChevronDown, LogOut, User, SquareUser, CreditCard, HeartPulse } from "lucide-react"
import { redirect } from "next/navigation";
import Link from "next/link"
import DropdownMenuItemLogout from "./logout/dropdown";
import LogoutForm from "./logout/server";


export default function Account() {
  return <div className="flex">
    <DropdownMenu>
      <DropdownMenuTrigger className="options-trigger" asChild>
        <Button variant="account" size="account">
          <span className="flex gap-1 items-center text-[15px] text-primary"><User className="w-8 h-8 p-1" /> <b className="hidden sm:block">Cuenta</b></span>
          <span className="hidden sm:flex transition-transform duration-300 option-arrow"><ChevronDown className="text-primary w-5 h-5" /></span>
          <span className="sr-only">Cuenta</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[178px] border-primary">
        <DropdownMenuLabel className="sm:hidden text-center text-primary">Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator className="sm:hidden bg-primary" />
        <DropdownMenuItem className="cursor-pointer hover:!bg-primary hover:!text-white focus:!bg-primary focus:!text-white" asChild>
          <Link href="/dashboard/account/profile" className="w-full flex items-center gap-2 rounded-sm text-sm font-semibold px-4 py-2 text-primary">
            <SquareUser className="w-5 h-5" />
            <span className="translate-y-[1px]">Mi Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItemLogout>
          <LogoutForm className="form-account-logout opacity-0 absolute w-0 h-0 overflow-hidden"/>
        </DropdownMenuItemLogout>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}