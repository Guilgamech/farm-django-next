import ClientLoginForm from "./client";
import { loginAction } from "@/server/auth.action";


export default function LoginForm() {
  const onFormAction = loginAction;
  return (
    <ClientLoginForm
      onFormAction={onFormAction}
    />
  );
}