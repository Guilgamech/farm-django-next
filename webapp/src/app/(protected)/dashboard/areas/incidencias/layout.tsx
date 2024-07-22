import { IncidenciaStoreProvider } from "@/context/incidencia";
import { getSession } from "@/lib/session";
import * as apiIncidencia from "@/lib/incidencia.api";
import { ReactNode } from "react";

export default async function IncidenciaLayout({ children }: { children: ReactNode }) {
    const session = await getSession();
    if (!session) {
      return <></>;
    }
    
    const incidencias = await apiIncidencia.list({ access: session.access });
    if (incidencias === "Unauthorized") {
      return <></>;
    }
  
    return <IncidenciaStoreProvider incidencias={incidencias}>{children}</IncidenciaStoreProvider>;
  }
  