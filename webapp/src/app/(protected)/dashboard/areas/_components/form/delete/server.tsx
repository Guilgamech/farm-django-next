import { TArea } from "@/schema/area.schema";
import { DeleteAreaClient } from "./client";
import { areaDeleteAction } from "@/server/area.action";



export function DeleteAreaForm({row}:{row: TArea}) {
  const onFormAction = areaDeleteAction;
  return (
    <DeleteAreaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}