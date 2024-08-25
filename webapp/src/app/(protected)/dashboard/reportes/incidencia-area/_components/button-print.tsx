"use client"

import { useIncidenciaPrintStore } from "@/context/incidencia";

export const ButtonIncidenciaReportPrint = () => {
  const { print, setPrint } = useIncidenciaPrintStore();
  const handleClickButtonPrint = ()=>{
    if(!print){
      setPrint(true)
    }
  }
  return <button className="btn-default font-bold" disabled={print} onClick={()=>handleClickButtonPrint()}>Imprimir</button>
}
