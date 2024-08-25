import { FormCureClient } from "./client";
import { cureAction } from "@/server/enfermedadCultivos.action";

export function CureForm({ id, crop, disease }: { id: number; crop: number; disease: number; }) {
  const onFormAction = cureAction;
  return (
    <FormCureClient
      onFormAction={onFormAction}
      id={id}
      crop={crop}
      disease={disease}
    />
  );
}
