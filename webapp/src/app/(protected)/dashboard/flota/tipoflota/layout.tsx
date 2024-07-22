import { TipoFlotaStoreProvider} from "@/context/tipof";
import { getSession } from "@/lib/session";
import * as apiTipoFlota from "@/lib/tipof.api"
import { ReactNode } from "react";

export default async function TipoFlotaLayout({ children }: {children:ReactNode}){
  const session = await getSession()
  if(!session){
    return <></>
  }
  const tipoflotas = await apiTipoFlota.list({access:session.access})
  if(tipoflotas === "Unauthorized"){
    return <></>
  }
  return <TipoFlotaStoreProvider tipoflotas={tipoflotas}>{children}</TipoFlotaStoreProvider>
}