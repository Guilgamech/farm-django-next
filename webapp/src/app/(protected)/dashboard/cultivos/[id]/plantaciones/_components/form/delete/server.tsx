import { TArea } from "@/schema/area.schema";
import { DeletePlantacionClient } from "./client";
import { areaCultivoDeleteAction } from "@/server/areaCultivos.action";




export function DeletePlantacionForm({id}:{id: number}) {
  const onFormAction = areaCultivoDeleteAction;
  return (
    <DeletePlantacionClient
      onFormAction={onFormAction}
      id={id}
    />
  );
}