import { CardTable } from "@/components/shared/card";
import { FormModal } from "@/components/shared/modal";
import { TitleActionBooking } from "@/components/shared/section";
import Link from "next/link";
import { DiseaseForm } from "./_components/form/disease";
import { DataTableDisease } from "./_components/table/data-table";

export default function DiseasePage({ params: { id } }: { params: { id: string } }) {
  return <div className="page-content">
    <TitleActionBooking
      title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Enfermedades</h2>}
      subtitle={<p className="text-sm md:text-md">Gestionar las Enfermedades</p>}
      action={<div className="w-full flex flex-col gap-2">
        <Link href={`/dashboard/cultivos/${id}`} className="btn-default font-bold">Detalles Del Cultivo</Link>
        <FormModal
          trigger={<button className="btn-default font-bold">Añadir Enfermedad</button>}
          heading={<span>Añadir Enfermedad a un Cultivo</span>}>
          <DiseaseForm id={id} />
        </FormModal>
      </div>
      }
    />
    <CardTable>
      <DataTableDisease cropId={Number(id)} />
    </CardTable>
  </div>

}