import { CardTable } from "@/components/shared/card";
import { FormModal } from "@/components/shared/modal";
import { TitleActionBooking } from "@/components/shared/section";
import Link from "next/link";
import { AgricolaForm } from "./_components/form/trabajador";
import { DataTableTrabajadores } from "./_components/table";

export default function TrabajadoresPage({ params: { id } }: { params: { id: string } }) {
  return <div className="page-content">
    <TitleActionBooking
      title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Trabajadores</h2>}
      subtitle={<p className="text-sm md:text-md">Gestionar las Trabajadores</p>}
      action={<div className="w-full flex flex-col gap-2">
        <Link href={`/dashboard/cultivos/${id}`} className="btn-default font-bold">Detalles Del Cultivo</Link>
        <FormModal
          trigger={<button className="btn-default font-bold">Crear Trabajador</button>}
          heading={<span>Crear Trabajador </span>}>
          <AgricolaForm id={id} />
        </FormModal>
      </div>
      }
    />
    <CardTable>
      <DataTableTrabajadores cropId={Number(id)}/>
    </CardTable>
  </div>

}