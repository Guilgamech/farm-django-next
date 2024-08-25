import { AgricolaStoreProvider } from "@/context/agricola";
import { getSession } from "@/lib/session";
import * as apiAgricola from "@/lib/agricola.api";
import * as apiArea from "@/lib/area.api";
import { ReactNode } from "react";

export default async function FlotaLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) {
    return <></>;
  }
  const agricolas = await apiAgricola.list({ access: session.access });
  const areas = await apiArea.list({ access: session.access });

  if (agricolas === "Unauthorized" ||
    areas === "Unauthorized"
  ) {
    return <></>;
  }

  return <AgricolaStoreProvider
    agricolas={agricolas}
    areas={areas}
  >
    {children}
  </AgricolaStoreProvider>;
}
