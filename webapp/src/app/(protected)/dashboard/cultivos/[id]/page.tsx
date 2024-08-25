import { TitleActionBooking } from "@/components/shared/section";
import CultivoDetail from "./_components/detail";
import Link from "next/link";

export default function CultivoDetailPage({ params: { id } }: { params: { id: string } }) {
  return <div className="page-content">
    <TitleActionBooking
      title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Detalles de Cultivo</h2>}
      subtitle={<p className="text-sm md:text-md">Gestionar los detalles de los cultivos en la empresa</p>}
      action={<Link href="/dashboard/cultivos/gestionar" className="btn-default font-bold">Todos los Cultivos</Link>
      }
    />
    <CultivoDetail id={id} />
  </div>

}