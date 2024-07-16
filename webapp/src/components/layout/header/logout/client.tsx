"use client"

import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useFormState } from "react-dom";

export default function ClientLogoutForm({
  onFormAction,
  className
}: {
  onFormAction: (
    prevState: {},
    data: FormData
  ) => Promise<any>;
  className?:string
}) {
  const [state, formAction] = useFormState(onFormAction, {});
  return <form className={cn(className ? className : "")}
    action={formAction}
  >
    <button type="submit" className="w-full flex items-center gap-2 border-none px-4 text-sm rounded-sm font-semibold py-2 text-primary hover:bg-primary hover:text-white">
      <LogOut className="w-5 h-5" />
      <span className="translate-y-[1px]">Log out</span>
    </button>
  </form>
}