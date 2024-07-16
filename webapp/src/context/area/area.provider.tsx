"use client"
import { TArea } from "@/schema/area.schema";
import { ReactNode, useEffect } from "react";
import { useAreaStore } from "./area.store";

export const AreaStoreProvider = ({ children, areas }: { 
  children: ReactNode;
  areas:TArea[]
})=>{
  const {setAreas, setFetchingAreas} = useAreaStore()
  useEffect(()=>{
    setAreas(areas);
    setFetchingAreas(false);
  }, [])
  return children
}