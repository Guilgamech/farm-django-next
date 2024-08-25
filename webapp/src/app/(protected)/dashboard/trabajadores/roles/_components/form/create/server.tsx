import { TRol } from "@/schema/rol.schema";
import { FormRolClient } from "./client";
import { rolCreateEditAction } from "@/server/rol.action";



export function RolForm({row}:{row?: TRol}) {
  const onFormAction = rolCreateEditAction;
  return (
    <FormRolClient
      onFormAction={onFormAction}
      row={row}
    />
  );
}