import { TArea } from "@/schema/area.schema";
import { FormAreaClient } from "./client";
import { areaCreateEditAction } from "@/server/area.action";



export function AreaForm({row}:{row?: TArea}) {
  const onFormAction = areaCreateEditAction;
  return (
    <FormAreaClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}