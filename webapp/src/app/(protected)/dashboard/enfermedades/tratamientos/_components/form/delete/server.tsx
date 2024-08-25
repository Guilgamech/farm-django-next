import { TTratamientoRead, TTratamientoDeleteActionState } from "@/schema/tratamiento.schema";

import { DeleteTratamientoClient } from "./client";
import { tratamientoDeleteAction } from "@/server/tratamiento.action";



export function DeleteTratamientoForm({row}:{row: TTratamientoRead}) {
  const onFormAction = tratamientoDeleteAction;
  return (
    <DeleteTratamientoClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}