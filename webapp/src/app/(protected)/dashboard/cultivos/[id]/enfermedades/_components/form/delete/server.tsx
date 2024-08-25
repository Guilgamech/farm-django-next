import { TArea } from "@/schema/area.schema";
import { DeleteDiseaseClient } from "./client";
import { enfermedadCultivoDeleteAction } from "@/server/enfermedadCultivos.action";




export function DeleteDiseaseForm({id}:{id: number}) {
  const onFormAction = enfermedadCultivoDeleteAction;
  return (
    <DeleteDiseaseClient
      onFormAction={onFormAction}
      id={id}
    />
  );
}