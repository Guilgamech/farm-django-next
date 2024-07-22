import { AreaStoreProvider } from "@/context/area";
import { getSession } from "@/lib/session";
import * as apiFlota from "@/lib/flota.api";
import { ReactNode } from "react";
import { FlotaPrintStoreProvider } from "@/context/flota";

export default async function FlotaEstadoLayout({ children }: {children:ReactNode}){
  const session = await getSession()
  if(!session){
    return <></>
  }
  const flotas = await apiFlota.list({ access: session.access });
  if(flotas === "Unauthorized"){
    return <></>
  }
  return <FlotaPrintStoreProvider flotas={flotas}>{children}</FlotaPrintStoreProvider>
}