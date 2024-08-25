"use server"
import { FormTrabajadorClient } from "./client";
import { trabajadorAction } from "@/server/agricolaCultivos.action";

export async function AgricolaForm({ id }: { id:string }) {
  const onFormAction = trabajadorAction;
  return (
    <FormTrabajadorClient
      onFormAction={onFormAction}
      crop={Number(id)}
    />
  );
}

