import { AreaStoreProvider } from "@/context/area";
import { getSession } from "@/lib/session";
import * as apiArea from "@/lib/area.api"
import { ReactNode } from "react";

export default async function AreaLayout({ children }: {children:ReactNode}){
  const session = await getSession()
  if(!session){
    return <></>
  }
  const areas = await apiArea.list({access:session.access})
  if(areas === "Unauthorized"){
    return <></>
  }
  return <AreaStoreProvider areas={areas}>{children}</AreaStoreProvider>
}