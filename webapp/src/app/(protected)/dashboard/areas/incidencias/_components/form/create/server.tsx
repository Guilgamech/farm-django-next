import { TIncidencia, TIncidenciaRead } from "@/schema/incidencia.schema";
import { FormIncidenciaClient } from "./client";
import { incidenciaCreateEditAction } from "@/server/incidencia.action";

export function IncidenciaForm({ row }: { row?: TIncidenciaRead }) {
  const onFormAction = incidenciaCreateEditAction;
  return (
    <FormIncidenciaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}

