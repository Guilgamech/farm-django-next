"use client";
import { ReactNode, useEffect } from "react";
import { useCultivoStore } from "./cultivo.store";
import { TCultivoRead } from "@/schema/cultivo.schema";
import { TTrabajador } from "@/schema/trabajador.schema";
import { TTipoCultivo } from "@/schema/tipoc.schema";
import { useTipoCultivoStore } from "../tipoc";
import { useTrabajadorStore } from "../trabajador";
import { TAreaCultivoRead } from "@/schema/areacultivo.schema";
import { useAreaCultivoStore } from "../area/area-cultivo.store";
import Areas from "@/app/(protected)/dashboard/areas/page";
import { TArea } from "@/schema/area.schema";
import { useAreaStore } from "../area";
import { TEnfermedadCultivoRead } from "@/schema/enfermedadcultivo.schema";
import { TAgricola, TAgricolaRead } from "@/schema/agricola.schema";
import { TTratamiento, TTratamientoRead } from "@/schema/tratamiento.schema";
import { TEnfermedad, TEnfermedadRead } from "@/schema/enfermedad.schema";
import { useEnfermedadCultivoStore } from "../enfermedad/enfermedad-cultivo.store";
import { useTratamientoStore } from "../tratamiento";
import { useAgricolaStore } from "../agricola";
import { useAgricolaCultivoStore } from "../agricola/agricola-cultivo.store";
import { useEnfermedadStore } from "../enfermedad";
import { TAgricolaCultivoRead } from "@/schema/agricolacultivo.schema";

export const CultivoStoreProvider = ({ 
  children, 
  cultivos, 
  trabajadores,
  tipoCultivos,
  areaCultivos,
  agricolaCultivos,
  areas,
  tratamientos,
  enfermedades,
  agricolas,
  enfermedadCultivos,
 }: { 
    children: ReactNode,
    cultivos: TCultivoRead[],
    trabajadores: TTrabajador[],
    tratamientos: TTratamientoRead[],
    enfermedades: TEnfermedadRead[],
    agricolas: TAgricolaRead[],
    tipoCultivos: TTipoCultivo[],
    areaCultivos: TAreaCultivoRead[],
    agricolaCultivos: TAgricolaCultivoRead[],
    enfermedadCultivos: TEnfermedadCultivoRead[],
    areas: TArea[]

  }) => {
  const {setCultivos, setFetchingCultivos } = useCultivoStore();
  const {setTipoCultivos, setFetchingTipoCultivos } = useTipoCultivoStore();
  const {setTrabajadores, setFetchingTrabajadores} = useTrabajadorStore();
  const {setAreaCultivos, setFetchingAreaCultivos} = useAreaCultivoStore()
  const {setAgricolaCultivos, setFetchingAgricolaCultivos} = useAgricolaCultivoStore()
  const {setEnfermedadCultivos, setFetchingEnfermedadCultivos} = useEnfermedadCultivoStore()
  const {setTratamientos, setFetchingTratamientos} = useTratamientoStore()
  const {setAgricolas, setFetchingAgricolas} = useAgricolaStore()
  const {setEnfermedades, setFetchingEnfermedades} = useEnfermedadStore()
  const {setAreas, setFetchingAreas} = useAreaStore()
  useEffect(() => {
    setCultivos(cultivos)
    setFetchingCultivos(false)    
    setTipoCultivos(tipoCultivos)
    setFetchingTipoCultivos(false)    
    setTrabajadores(trabajadores)
    setFetchingTrabajadores(false)
    setAreaCultivos(areaCultivos)
    setFetchingAreaCultivos(false)
    setAreas(areas)
    setFetchingAreas(false)
    setAgricolaCultivos(agricolaCultivos)
    setFetchingAgricolaCultivos(false)
    setAgricolas(agricolas)
    setFetchingAgricolas(false)
    setTratamientos(tratamientos)
    setFetchingTratamientos(false)
    setEnfermedades(enfermedades)
    setFetchingEnfermedades(false)
    setEnfermedadCultivos(enfermedadCultivos)
    setFetchingEnfermedadCultivos(false)
    
  }, []);

  return <>{children}</>;
};