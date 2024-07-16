"use client"
import { ReactNode } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { cn } from "@/lib/utils";


export function FormModal({ children, trigger, heading, classNames }: { 
  children: ReactNode; 
  trigger: ReactNode;
  heading: ReactNode;
  classNames?:{
    modalContainer?:string;
    headingContainer?:string;    
  }

 }) {
  return <Dialog>
    <DialogTrigger asChild>
      {trigger}
    </DialogTrigger>
    <DialogContent className={cn(
      "sm:max-w-[425px] p-0",
      classNames?.modalContainer ?? ""
    )}>
      <DialogHeader className="w-full pt-6 px-6">
        <DialogTitle className={cn(
          "pb-2 md:pb-3 border-b border-black text-xl md:text-2xl font-roboto text-start",
          classNames?.headingContainer ?? ""
        )}>
          {heading}
        </DialogTitle>
      </DialogHeader>
      <div className="w-full px-6 pb-6">
        {children}
      </div>
    </DialogContent>
  </Dialog>
}