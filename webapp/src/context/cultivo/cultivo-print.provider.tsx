"use client";
import { ReactNode, useEffect } from "react";
import { TCultivoRead } from "@/schema/cultivo.schema";
import { useCultivoPrintStore } from "./cultivo-print.store";
import { TTrabajador } from "@/schema/trabajador.schema";
import { useTrabajadorStore } from "../trabajador";

export const CultivoPrintStoreProvider = ({
  children,
  cultivos,
  trabajadores, 
}: {
    children: ReactNode,
    cultivos: TCultivoRead[],
    trabajadores: TTrabajador[],
  }) => {
  const { setCultivos } = useCultivoPrintStore();
  const { setTrabajadores, setFetchingTrabajadores } = useTrabajadorStore();

  useEffect(() => {
    setCultivos(cultivos),
    setTrabajadores(trabajadores)
    setFetchingTrabajadores(false)
  }, []);
  return <>{children}</>;
};