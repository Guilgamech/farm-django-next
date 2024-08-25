import { TTratamiento, TTratamientoRead } from "@/schema/tratamiento.schema";
import { FormTratamientoClient } from "./client";
import { tratamientoCreateEditAction } from "@/server/tratamiento.action";

export function TratamientoForm({ row }: { row?: TTratamientoRead }) {
  const onFormAction = tratamientoCreateEditAction;
  return (
    <FormTratamientoClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}

