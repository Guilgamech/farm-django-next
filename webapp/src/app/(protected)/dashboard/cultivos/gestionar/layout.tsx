import { CultivoStoreProvider } from "@/context/cultivo";
import { getSession } from "@/lib/session";
import * as apiTipoCultivo from "@/lib/tipoc.api";
import * as apiTrabajador from "@/lib/trabajador.api";
import * as apiCultivo from "@/lib/cultivo.api";
import { ReactNode } from "react";

export default async function CultivoLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) {
    return <></>;
  }
  const tipoCultivos = await apiTipoCultivo.list({ access: session.access });
  const trabajadores = await apiTrabajador.list({ access: session.access });

  
  const cultivos = await apiCultivo.list({ access: session.access });
  if (cultivos === "Unauthorized" ||
    tipoCultivos === "Unauthorized" ||
    trabajadores === "Unauthorized") {
    return <></>;
  }

  return <CultivoStoreProvider 
  cultivos={cultivos}    
  trabajadores={trabajadores}
  tipoCultivos={tipoCultivos}
  >
    {children}</CultivoStoreProvider>;
}
