import { IncidenciaStoreProvider } from "@/context/incidencia";
import { getSession } from "@/lib/session";
import * as apiIncidencia from "@/lib/incidencia.api";
import * as apiArea from "@/lib/area.api";
import { ReactNode } from "react";

export default async function FlotaLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) {
    return <></>;
  }
  const incidencias = await apiIncidencia.list({ access: session.access });
  const areas = await apiArea.list({ access: session.access });

  if (incidencias === "Unauthorized" ||
    areas === "Unauthorized"
  ) {
    return <></>;
  }

  return <IncidenciaStoreProvider
    incidencias={incidencias}
    areas={areas}
  >
    {children}
  </IncidenciaStoreProvider>;
}
