import { TTipoFlota } from "@/schema/tipof.schema";
import { FormTipoFlotaClient } from "./client";
import { tipoflotaCreateEditAction } from "@/server/tipof.action";



export function TipoFlotaForm({row}:{row?: TTipoFlota}) {
  const onFormAction = tipoflotaCreateEditAction;
  return (
    <FormTipoFlotaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}