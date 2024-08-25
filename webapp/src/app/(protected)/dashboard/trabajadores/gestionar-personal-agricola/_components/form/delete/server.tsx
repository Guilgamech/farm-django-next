import { TAgricolaRead, TAgricolaDeleteActionState } from "@/schema/agricola.schema";

import { DeleteAgricolaClient } from "./client";
import { agricolaDeleteAction } from "@/server/agricola.action";



export function DeleteAgricolaForm({row}:{row: TAgricolaRead}) {
  const onFormAction = agricolaDeleteAction;
  return (
    <DeleteAgricolaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}