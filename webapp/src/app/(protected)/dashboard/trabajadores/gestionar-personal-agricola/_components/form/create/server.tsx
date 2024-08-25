import { TAgricola, TAgricolaRead } from "@/schema/agricola.schema";
import { FormAgricolaClient } from "./client";
import { agricolaCreateEditAction } from "@/server/agricola.action";

export function AgricolaForm({ row }: { row?: TAgricolaRead }) {
  const onFormAction = agricolaCreateEditAction;
  return (
    <FormAgricolaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}

