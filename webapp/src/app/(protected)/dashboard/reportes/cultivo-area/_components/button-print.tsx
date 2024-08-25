"use client"

import { useCultivoPrintStore } from "@/context/cultivo";

export const ButtonCultivoReportPrint = () => {
  const { print, setPrint } = useCultivoPrintStore();
  const handleClickButtonPrint = ()=>{
    if(!print){
      setPrint(true)
    }
  }
  return <button className="btn-default font-bold" disabled={print} onClick={()=>handleClickButtonPrint()}>Imprimir</button>
}
