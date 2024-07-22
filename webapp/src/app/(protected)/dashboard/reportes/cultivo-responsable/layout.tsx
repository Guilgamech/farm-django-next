import { AreaStoreProvider } from "@/context/area";
import { getSession } from "@/lib/session";
import * as apiCultivo from "@/lib/cultivo.api";
import * as apiTrabajador from "@/lib/trabajador.api";
import { ReactNode } from "react";
import { CultivoPrintStoreProvider } from "@/context/cultivo";

export default async function CultivoResponsableLayout({ children }: {children:ReactNode}){
  const session = await getSession()
  if(!session){
    return <></>
  }

  const cultivos = await apiCultivo.list({ access: session.access });
  const trabajadores = await apiTrabajador.list({ access: session.access });
  if(cultivos === "Unauthorized"||
    trabajadores === "Unauthorized"){
    return <></>
  }
  return <CultivoPrintStoreProvider cultivos={cultivos} trabajadores={trabajadores}>{children}</CultivoPrintStoreProvider>
}