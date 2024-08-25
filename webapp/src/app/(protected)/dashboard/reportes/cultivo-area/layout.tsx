import { AreaStoreProvider } from "@/context/area";
import { getSession } from "@/lib/session";
import * as apiAreaCultivo from "@/lib/area-cultivo.api";
import * as apiTrabajador from "@/lib/trabajador.api";
import * as apiAreas from "@/lib/area.api";
import { ReactNode } from "react";
import { AreaCultivoPrintStoreProvider } from "@/context/cultivo";

export default async function CultivoAreaLayout({ children }: {children:ReactNode}){
  const session = await getSession()
  if(!session){
    return <></>
  }

  const areaCultivos = await apiAreaCultivo.list({ access: session.access });
  const areas = await apiAreas.list({ access: session.access });
  if(areaCultivos === "Unauthorized"||
    areas === "Unauthorized"){
    return <></>
  }
  return <AreaCultivoPrintStoreProvider areaCultivos={areaCultivos} areas={areas}>{children}</AreaCultivoPrintStoreProvider>
}