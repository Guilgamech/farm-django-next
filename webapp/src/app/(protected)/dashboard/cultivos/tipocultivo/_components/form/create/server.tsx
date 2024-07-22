import { TTipoCultivo } from "@/schema/tipoc.schema";
import { FormTipoCultivoClient } from "./client";
import { tipocultivoCreateEditAction } from "@/server/tipoc.action";



export function TipoCultivoForm({row}:{row?: TTipoCultivo}) {
  const onFormAction = tipocultivoCreateEditAction;
  return (
    <FormTipoCultivoClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}