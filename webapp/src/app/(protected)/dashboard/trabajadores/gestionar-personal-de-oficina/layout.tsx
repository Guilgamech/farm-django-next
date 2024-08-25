import { OficinaStoreProvider } from "@/context/oficina";
import { getSession } from "@/lib/session";
import * as apiOficina from "@/lib/oficina.api";
import * as apiArea from "@/lib/area.api";
import * as apiRol from "@/lib/rol.api";
import { ReactNode } from "react";

export default async function FlotaLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) {
    return <></>;
  }
  const oficinas = await apiOficina.list({ access: session.access });
  const areas = await apiArea.list({ access: session.access });
  const rols = await apiRol.list({ access: session.access });

  if (oficinas === "Unauthorized" ||
    areas === "Unauthorized" ||
    rols === "Unauthorized"
  ) {
    return <></>;
  }

  return <OficinaStoreProvider
    oficinas={oficinas}
    areas={areas}
    rols={rols}
  >
    {children}
  </OficinaStoreProvider>;
}
