"use client";
import { ReactNode, useEffect } from "react";
import { useCultivoStore } from "./cultivo.store";
import { TCultivoRead } from "@/schema/cultivo.schema";
import { TTrabajador } from "@/schema/trabajador.schema";
import { TTipoCultivo } from "@/schema/tipoc.schema";
import { useTipoCultivoStore } from "../tipoc";
import { useTrabajadorStore } from "../trabajador";

export const CultivoStoreProvider = ({ 
  children, 
  cultivos, 
  trabajadores,
  tipoCultivos,
 }: { 
    children: ReactNode,
    cultivos: TCultivoRead[],
    trabajadores: TTrabajador[],
    tipoCultivos: TTipoCultivo[],
  }) => {
  const {setCultivos, setFetchingCultivos } = useCultivoStore();
  const {setTipoCultivos, setFetchingTipoCultivos } = useTipoCultivoStore();
  const {setTrabajadores, setFetchingTrabajadores} = useTrabajadorStore();

  useEffect(() => {
    setCultivos(cultivos)
    setFetchingCultivos(false)    
    setTipoCultivos(tipoCultivos)
    setFetchingTipoCultivos(false)    
    setTrabajadores(trabajadores)
    setFetchingTrabajadores(false)


  }, []);

  return <>{children}</>;
};