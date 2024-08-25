import { TFlota, TFlotaRead } from "@/schema/flota.schema";
import { FormFlotaClient } from "./client";
import { flotaCreateEditAction } from "@/server/flota.action";

export function FlotaForm({ row }: { row?: TFlotaRead }) {
  const onFormAction = flotaCreateEditAction;
  return (
    <FormFlotaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}

