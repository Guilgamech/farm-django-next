import { TCultivo, TCultivoRead } from "@/schema/cultivo.schema";
import { FormCultivoClient } from "./client";
import { cultivoCreateEditAction} from "@/server/cultivo.action";

export function CultivoForm({ row }: { row?: TCultivoRead }) {
  const onFormAction = cultivoCreateEditAction;
  return (
    <FormCultivoClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}

