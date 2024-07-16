import { TTipoFlota } from "@/schema/tipof.schema";
import { DeleteTipoFlotaClient } from "./client";
import { tipoflotaDeleteAction } from "@/server/tipof.action";



export function DeleteTipoFlotaForm({row}:{row: TTipoFlota}) {
  const onFormAction = tipoflotaDeleteAction;
  return (
    <DeleteTipoFlotaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}