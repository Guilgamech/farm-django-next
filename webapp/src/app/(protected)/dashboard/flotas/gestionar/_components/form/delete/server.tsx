import { TFlotaRead, TFlotaDeleteActionState } from "@/schema/flota.schema";

import { DeleteFlotaClient } from "./client";
import { flotaDeleteAction } from "@/server/flota.action";



export function DeleteFlotaForm({row}:{row: TFlotaRead}) {
  const onFormAction = flotaDeleteAction;
  return (
    <DeleteFlotaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}