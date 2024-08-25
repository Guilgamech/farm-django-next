import { TRol } from "@/schema/rol.schema";
import { DeleteRolClient } from "./client";
import { rolDeleteAction } from "@/server/rol.action";



export function DeleteRolForm({row}:{row: TRol}) {
  const onFormAction = rolDeleteAction;
  return (
    <DeleteRolClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}