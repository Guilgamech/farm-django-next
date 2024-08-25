"use client";
import { ReactNode, useEffect } from "react";
import { TCultivoRead } from "@/schema/cultivo.schema";
import { useAreaCultivoPrintStore, useCultivoPrintStore } from "./cultivo-print.store";
import { TTrabajador } from "@/schema/trabajador.schema";
import { TArea } from "@/schema/area.schema";
import { useTrabajadorStore } from "../trabajador";
import { useAreaStore } from "../area";
import { TAreaCultivoRead } from "@/schema/areacultivo.schema";

export const CultivoPrintStoreProvider = ({
  children,
  cultivos,
  trabajadores,
  areas,
}: {
    children: ReactNode,
    cultivos: TCultivoRead[],
    trabajadores: TTrabajador[],
    areas: TArea[],
  }) => {
  const { setCultivos } = useCultivoPrintStore();
  const { setTrabajadores, setFetchingTrabajadores } = useTrabajadorStore();
  const { setAreas, setFetchingAreas } = useAreaStore();

  useEffect(() => {
    setCultivos(cultivos),
    setTrabajadores(trabajadores)
    setFetchingTrabajadores(false)    
    setAreas(areas)
    setFetchingAreas(false)
  }, []);
  return <>{children}</>;
};

export const AreaCultivoPrintStoreProvider = ({
  children,
  areaCultivos,
  areas,
}: {
    children: ReactNode,
    areaCultivos: TAreaCultivoRead[],
    areas: TArea[],
  }) => {
  const { setAreaCultivos } = useAreaCultivoPrintStore();
  const { setAreas, setFetchingAreas } = useAreaStore();

  useEffect(() => {
    setAreaCultivos(areaCultivos),
    setAreas(areas)
    setFetchingAreas(false)
  }, []);
  return <>{children}</>;
};