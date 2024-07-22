"use client"

import { useFlotaPrintStore } from "@/context/flota";

export const ButtonFlotaReportPrint = () => {
  const { print, setPrint } = useFlotaPrintStore();
  const handleClickButtonPrint = ()=>{
    if(!print){
      setPrint(true)
    }
  }
  return <button className="btn-default font-bold" disabled={print} onClick={()=>handleClickButtonPrint()}>Imprimir</button>
}
