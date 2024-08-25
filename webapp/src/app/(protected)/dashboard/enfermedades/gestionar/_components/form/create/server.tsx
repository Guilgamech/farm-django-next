import { TEnfermedad, TEnfermedadRead } from "@/schema/enfermedad.schema";
import { FormEnfermedadClient } from "./client";
import { enfermedadCreateEditAction } from "@/server/enfermedad.action";

export function EnfermedadForm({ row }: { row?: TEnfermedadRead }) {
  const onFormAction = enfermedadCreateEditAction;
  return (
    <FormEnfermedadClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}

