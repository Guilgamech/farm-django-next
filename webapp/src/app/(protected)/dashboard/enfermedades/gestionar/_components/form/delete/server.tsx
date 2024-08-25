import { TEnfermedadRead, TEnfermedadDeleteActionState } from "@/schema/enfermedad.schema";

import { DeleteEnfermedadClient } from "./client";
import { enfermedadDeleteAction } from "@/server/enfermedad.action";



export function DeleteEnfermedadForm({row}:{row: TEnfermedadRead}) {
  const onFormAction = enfermedadDeleteAction;
  return (
    <DeleteEnfermedadClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}