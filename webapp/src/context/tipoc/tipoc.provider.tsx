"use client"
import { TTipoCultivo } from "@/schema/tipoc.schema";
import { ReactNode, useEffect } from "react";
import { useTipoCultivoStore } from "./tipoc.store";

export const TipoCultivoStoreProvider = ({ children, tipocultivos }: { 
  children: ReactNode;
  tipocultivos:TTipoCultivo[]
})=>{
  const {setTipoCultivos, setFetchingTipoCultivos} = useTipoCultivoStore()
  useEffect(()=>{
    setTipoCultivos(tipocultivos)
    setFetchingTipoCultivos(false);
  }, [])
  return children
}