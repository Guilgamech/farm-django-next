"use client";
import { ReactNode, useEffect } from "react";
import { useFlotaStore } from "./flota.store";
import { TArea } from "@/schema/area.schema";
import { TFlota, TFlotaRead } from "@/schema/flota.schema";
import { TTrabajador } from "@/schema/trabajador.schema";
import { TTipoFlota } from "@/schema/tipof.schema";
import { useAreaStore } from "../area";
import { useTipoFlotaStore } from "../tipof";
import { useTrabajadorStore } from "../trabajador";

export const FlotaStoreProvider = ({ 
  children, 
  flotas, 
  areas,
  tipoFlotas,
  trabajadores }: { 
    children: ReactNode,
    flotas: TFlotaRead[], 
    areas:TArea[], 
    trabajadores:TTrabajador[], 
    tipoFlotas:TTipoFlota[] 
  }) => {
  const { setFlotas, setFetchingFlotas } = useFlotaStore();
  const {setAreas, setFetchingAreas} = useAreaStore();
  const {setTipoFlotas, setFetchingTipoFlotas} = useTipoFlotaStore();
  const {setTrabajadores, setFetchingTrabajadores} = useTrabajadorStore();

  useEffect(() => {
    setFlotas(flotas)
    setFetchingFlotas(false)
    setAreas(areas)
    setFetchingAreas(false)
    setTipoFlotas(tipoFlotas)
    setFetchingTipoFlotas(false)
    setTrabajadores(trabajadores)
    setFetchingTrabajadores(false)
    
  }, []);

  return <>{children}</>;
};
