import { TOficinaRead, TOficinaDeleteActionState } from "@/schema/oficina.schema";

import { DeleteOficinaClient } from "./client";
import { oficinaDeleteAction } from "@/server/oficina.action";



export function DeleteOficinaForm({row}:{row: TOficinaRead}) {
  const onFormAction = oficinaDeleteAction;
  return (
    <DeleteOficinaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}