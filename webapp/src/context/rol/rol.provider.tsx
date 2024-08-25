"use client"
import { TRol } from "@/schema/rol.schema";
import { ReactNode, useEffect } from "react";
import { useRolStore } from "./rol.store";

export const RolStoreProvider = ({ children, rols }: { 
  children: ReactNode;
  rols:TRol[]
})=>{
  const {setRols, setFetchingRols} = useRolStore()
  useEffect(()=>{
    setRols(rols)
    setFetchingRols(false);
  }, [])
  return children
}