import { FlotaStoreProvider } from "@/context/flota";
import { getSession } from "@/lib/session";
import * as apiFlota from "@/lib/flota.api";
import * as apiArea from "@/lib/area.api";
import * as apiTipoFlota from "@/lib/tipof.api";
import * as apiTrabajador from "@/lib/trabajador.api";
import { ReactNode } from "react";

export default async function FlotaLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) {
    return <></>;
  }
  const flotas = await apiFlota.list({ access: session.access });
  const areas = await apiArea.list({ access: session.access });
  const tipoFlotas = await apiTipoFlota.list({ access: session.access });
  const trabajadores = await apiTrabajador.list({ access: session.access });

  if (flotas === "Unauthorized" ||
    areas === "Unauthorized" ||
    tipoFlotas === "Unauthorized" ||
    trabajadores === "Unauthorized"
  ) {
    return <></>;
  }

  return <FlotaStoreProvider
    flotas={flotas}
    areas={areas}
    trabajadores={trabajadores}
    tipoFlotas={tipoFlotas}
  >
    {children}
  </FlotaStoreProvider>;
}
