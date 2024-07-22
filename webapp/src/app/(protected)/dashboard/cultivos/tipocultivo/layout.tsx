import { TipoCultivoStoreProvider} from "@/context/tipoc";
import { getSession } from "@/lib/session";
import * as apiTipoCultivo from "@/lib/tipoc.api"
import { ReactNode } from "react";

export default async function TipoCultivoLayout({ children }: {children:ReactNode}){
  const session = await getSession()
  if(!session){
    return <></>
  }
  const tipocultivos = await apiTipoCultivo.list({access:session.access})
  if(tipocultivos === "Unauthorized"){
    return <></>
  }
  return <TipoCultivoStoreProvider tipocultivos={tipocultivos}>{children}</TipoCultivoStoreProvider>
}