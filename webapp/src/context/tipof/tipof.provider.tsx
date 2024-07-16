"use client"
import { TTipoFlota } from "@/schema/tipof.schema";
import { ReactNode, useEffect } from "react";
import { useTipoFlotaStore } from "./tipof.store";

export const TipoFlotaStoreProvider = ({ children, tipoflotas }: { 
  children: ReactNode;
  tipoflotas:TTipoFlota[]
})=>{
  const {setTipoFlotas, setFetchingTipoFlotas} = useTipoFlotaStore()
  useEffect(()=>{
    setTipoFlotas(tipoflotas)
    setFetchingTipoFlotas(false);
  }, [])
  return children
}