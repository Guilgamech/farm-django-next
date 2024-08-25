import { TOficina, TOficinaRead } from "@/schema/oficina.schema";
import { FormOficinaClient } from "./client";
import { oficinaCreateEditAction } from "@/server/oficina.action";

export function OficinaForm({ row }: { row?: TOficinaRead }) {
  const onFormAction = oficinaCreateEditAction;
  return (
    <FormOficinaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}

