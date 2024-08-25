import { TratamientoStoreProvider } from "@/context/tratamiento";
import { getSession } from "@/lib/session";
import * as apiTratamiento from "@/lib/tratamiento.api";
import * as apiEnfermedad from "@/lib/enfermedad.api";
import { ReactNode } from "react";

export default async function FlotaLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) {
    return <></>;
  }
  const tratamientos = await apiTratamiento.list({ access: session.access });
  const enfermedades = await apiEnfermedad.list({ access: session.access });

  if (tratamientos === "Unauthorized" ||
    enfermedades === "Unauthorized"
  ) {
    return <></>;
  }

  return <TratamientoStoreProvider
    tratamientos={tratamientos}
    enfermedades={enfermedades}
  >
    {children}
  </TratamientoStoreProvider>;
}
