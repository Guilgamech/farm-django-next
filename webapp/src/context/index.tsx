"use client"
import { TAgricolaRead } from "@/schema/agricola.schema";
import { TAgricolaCultivoRead } from "@/schema/agricolacultivo.schema";
import { TArea } from "@/schema/area.schema";
import { TAreaCultivoRead } from "@/schema/areacultivo.schema";
import { TCultivoRead } from "@/schema/cultivo.schema";
import { TEnfermedadRead } from "@/schema/enfermedad.schema";
import { TEnfermedadCultivoRead } from "@/schema/enfermedadcultivo.schema";
import { TFlota, TFlotaRead } from "@/schema/flota.schema";
import { TIncidencia, TIncidenciaRead } from "@/schema/incidencia.schema";
import { TOficina, TOficinaRead } from "@/schema/oficina.schema";
import { TRol } from "@/schema/rol.schema";
import { TTipoCultivo } from "@/schema/tipoc.schema";
import { TTipoFlota } from "@/schema/tipof.schema";
import { TTrabajador } from "@/schema/trabajador.schema";
import { TTratamientoRead } from "@/schema/tratamiento.schema";
import { ReactNode, useEffect } from "react";
import { useAgricolaStore } from "./agricola";
import { useAgricolaCultivoStore } from "./agricola/agricola-cultivo.store";
import { useAreaCultivoStore, useAreaStore } from "./area";
import { useCultivoStore } from "./cultivo";
import { useEnfermedadCultivoStore, useEnfermedadStore } from "./enfermedad";
import { useTipoCultivoStore } from "./tipoc";
import { useTrabajadorStore } from "./trabajador";
import { useTratamientoStore } from "./tratamiento";
import { useFlotaStore } from "./flota";
import { useIncidenciaStore } from "./incidencia";
import { useOficinaStore } from "./oficina";
import { useRolStore } from "./rol";
import { useTipoFlotaStore } from "./tipof";
export default function GlobalStore({ 
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
  incidencias,
  oficinas,
  rols,
  flotas,
  tipoFlotas,
}: { 
  children: ReactNode;
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
  incidencias: TIncidenciaRead[]
  rols: TRol[]
  oficinas: TOficinaRead[]
  flotas: TFlotaRead[]
  tipoFlotas: TTipoFlota[]
}) {
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
  const {setIncidencias, setFetchingIncidencias} = useIncidenciaStore()
  const {setRols, setFetchingRols} = useRolStore()
  const {setOficinas, setFetchingOficinas} = useOficinaStore()
  const {setFlotas, setFetchingFlotas} = useFlotaStore()
  const {setTipoFlotas, setFetchingTipoFlotas} = useTipoFlotaStore()
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
    setIncidencias(incidencias)
    setFetchingIncidencias(false)
    setRols(rols)
    setFetchingRols(false)
    setOficinas(oficinas)
    setFetchingOficinas(false)
    setTipoFlotas(tipoFlotas)
    setFetchingTipoFlotas(false)
    setFlotas(flotas)
    setFetchingFlotas(false)
  }, [])
  return children;
}