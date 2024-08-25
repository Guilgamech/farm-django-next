import { TCultivoRead, TCultivoDeleteActionState } from "@/schema/cultivo.schema";

import { DeleteCultivoClient } from "./client";
import { cultivoDeleteAction } from "@/server/cultivo.action";



export function DeleteCultivoForm({row}:{row: TCultivoRead}) {
  const onFormAction = cultivoDeleteAction;
  return (
    <DeleteCultivoClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}