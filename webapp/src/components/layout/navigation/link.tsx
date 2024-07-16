"use client"
import { useNavigationStore } from "@/context/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";


export default function LinkNavigation({href, isChild=false, icon, text, active}:{href:string, isChild?:boolean, icon?:ReactNode, text:ReactNode, active: "exact" | "include"}){
  const pathName = usePathname();
  const showActive = ((active === "exact" && href === pathName) || (active === "include" && pathName.startsWith(href)));
  const { setActivePath } = useNavigationStore()
  return <Link href={href} onClick={()=>{
    if(active === "exact" && !isChild){
      setActivePath(href)
    }
  }} className={cn(
    "rounded-3xl h-[34px] text-[15px] font-bold flex justify-start items-center gap-4 px-[18px] bg-white text-primary",
    "hover:bg-primary hover:text-white transition-colors duration-300",
    showActive ? "bg-primary text-white" : ""
  )}>
    {icon && icon}
    {text}
  </Link>
}