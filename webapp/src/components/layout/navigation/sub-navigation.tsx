"use client"
import { ReactNode, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useNavigationStore } from "@/context/navigation";

export default function SubNavigation({children, href, icon, text}:{children:ReactNode, href:string, icon?:ReactNode, text:ReactNode}){
  const pathname = usePathname()
  const {activePath, setActivePath} = useNavigationStore()
  useEffect(()=>{
    setActivePath(pathname.startsWith(href) ? href : "")
  },[])
  return <Accordion type="single" collapsible value={activePath} onValueChange={setActivePath} className="sub-nav">
  <AccordionItem value={href} className={cn(
    "sub-nav-item",
    pathname.startsWith(href) ? "active" : ""
  )}>
    <AccordionTrigger><span className="flex gap-4 font-bold">{icon && icon} {text}</span></AccordionTrigger>
    <AccordionContent className="sub-nav-content">
      {children}
    </AccordionContent>
  </AccordionItem>
</Accordion>
}