"use client"

import { CardTable } from "@/components/shared/card";
import { useCultivoStore } from "@/context/cultivo";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function CultivoDetail({ id }: { id: string }) {
  const pathName = usePathname();
  const { cultivos } = useCultivoStore();
  const cultivo = cultivos.find(el => el.id === Number(id))
  if (!cultivo) {
    return <CardTable><h2 className="font-semibold">No existe un cultivo con ese código</h2></CardTable>
  }

  return <CardTable>
    <h2 className="text-primary text-2xl uppercase"><b>Cultivo: {cultivo.type.name} - {cultivo.name}</b></h2>
    <div className="flex flex-col md:flex-row gap-5 md:gap-0">
      <div className="w-2/3 flex flex-col gap-5">
        <p className="text-xl mt-5"><b>Código: </b>{cultivo.code}</p>
        <p className="text-xl"><b>Estado: </b>{cultivo.status}</p>
        <p className="text-xl"><b>Jefe: </b>{cultivo.manager.name}</p>
        <p className="text-xl"><b>Tipo De Cultivo: </b>{cultivo.type.name}</p>
      </div>
      <div className="w-1/3 flex flex-col gap-2">
        <Link href={`${pathName}/plantaciones`} className="btn-default font-bold">Plantaciones</Link>
        <Link href={`${pathName}/enfermedades`} className="btn-default font-bold">Enfermadades</Link>
        <Link href={`${pathName}/trabajadores`} className="btn-default font-bold">Trabajadores</Link>
      </div>
    </div>
  </CardTable>
}