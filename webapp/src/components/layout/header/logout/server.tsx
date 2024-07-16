import { logoutAction } from "@/server/auth.action";
import ClientLogoutForm from "./client";

export default function LogoutForm({className}:{className?:string}) {
  const onFormAction = logoutAction;
  return (
    <ClientLogoutForm className={className}
      onFormAction={onFormAction}
    />
  );
}

