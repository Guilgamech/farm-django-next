import { TIncidenciaRead, TIncidenciaDeleteActionState } from "@/schema/incidencia.schema";

import { DeleteIncidenciaClient } from "./client";
import { incidenciaDeleteAction } from "@/server/incidencia.action";



export function DeleteIncidenciaForm({row}:{row: TIncidenciaRead}) {
  const onFormAction = incidenciaDeleteAction;
  return (
    <DeleteIncidenciaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}