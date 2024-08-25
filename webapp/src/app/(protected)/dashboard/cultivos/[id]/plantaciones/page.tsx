import { CardTable } from "@/components/shared/card";
import { FormModal } from "@/components/shared/modal";
import { TitleActionBooking } from "@/components/shared/section";
import Link from "next/link";
import { SeedForm } from "./_components/form/plantacion";
import { DataTablePlantaciones } from "./_components/table";

export default function PlantacionesPage({ params: { id } }: { params: { id: string } }) {
  return <div className="page-content">
    <TitleActionBooking
      title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Plantaciones</h2>}
      subtitle={<p className="text-sm md:text-md">Gestionar las Plantaciones</p>}
      action={<div className="w-full flex flex-col gap-2">
        <Link href={`/dashboard/cultivos/${id}`} className="btn-default font-bold">Detalles Del Cultivo</Link>
        <FormModal
          trigger={<button className="btn-default font-bold">Crear Plantación</button>}
          heading={<span>Crear Plantacion </span>}>
          <SeedForm id={id} />
        </FormModal>
      </div>
      }
    />
    <CardTable>
      <DataTablePlantaciones cropId={Number(id)} />
    </CardTable>
  </div>

}