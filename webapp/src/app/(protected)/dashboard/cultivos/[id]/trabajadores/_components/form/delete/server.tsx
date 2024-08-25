import { DeleteTrabajadorClient } from "./client";
import { agricolaCultivoDeleteAction } from "@/server/agricolaCultivos.action";




export function DeleteTrabajadorForm({id}:{id: number}) {
  const onFormAction = agricolaCultivoDeleteAction;
  return (
    <DeleteTrabajadorClient
      onFormAction={onFormAction}
      id={id}
    />
  );
}