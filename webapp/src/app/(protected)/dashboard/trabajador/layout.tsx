import { TrabajadorStoreProvider } from "@/context/trabajador";
import { getSession } from "@/lib/session";
import * as apiTrabajador from "@/lib/trabajador.api";
import { ReactNode } from "react";

export default async function TrabajadorLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) {
    return <></>;
  }
  const trabajadores = await apiTrabajador.list({ access: session.access });
  if (trabajadores === "Unauthorized") {
    return <></>;
  }
  return <TrabajadorStoreProvider trabajadores={trabajadores}>{children}</TrabajadorStoreProvider>;
}
