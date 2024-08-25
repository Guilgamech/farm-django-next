import { RolStoreProvider} from "@/context/rol";
import { getSession } from "@/lib/session";
import * as apiRol from "@/lib/rol.api"
import { ReactNode } from "react";

export default async function RolLayout({ children }: {children:ReactNode}){
  const session = await getSession()
  if(!session){
    return <></>
  }
  const rols = await apiRol.list({access:session.access})
  if(rols === "Unauthorized"){
    return <></>
  }
  return <RolStoreProvider rols={rols}>{children}</RolStoreProvider>
}