import { TTipoCultivo } from "@/schema/tipoc.schema";
import { DeleteTipoCultivoClient } from "./client";
import { tipocultivoDeleteAction } from "@/server/tipoc.action";



export function DeleteTipoCultivoForm({row}:{row: TTipoCultivo}) {
  const onFormAction = tipocultivoDeleteAction;
  return (
    <DeleteTipoCultivoClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}