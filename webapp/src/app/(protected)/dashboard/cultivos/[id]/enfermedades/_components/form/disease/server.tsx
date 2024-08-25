"use server"
import { FormDiseaseClient } from "./client";
import { diseaseAction } from "@/server/enfermedadCultivos.action";

export async function DiseaseForm({ id }: { id:string }) {
  const onFormAction = diseaseAction;
  return (
    <FormDiseaseClient
      onFormAction={onFormAction}
      crop={Number(id)}
    />
  );
}

