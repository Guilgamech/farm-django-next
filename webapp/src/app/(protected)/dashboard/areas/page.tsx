import Link from "next/link";
import { DataTableArea } from "./_components/table";
import { CardTable } from "@/components/shared/card";
import { TitleActionBooking } from "@/components/shared/section";
import { FormModal } from "@/components/shared/modal";
import { AreaForm } from "./_components/form/create";

export default function Areas() {
  return <div className="page-content">
    <TitleActionBooking
      title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Areas</h2>}
      subtitle={<p className="text-sm  md:text-md">Gestionar las Areas de la Empresa</p>}
      action={<FormModal
        trigger={<button className="btn-default font-bold">Crear Area</button>}
        heading={<span>Crear Área Formulario</span>}>
        <AreaForm />
      </FormModal>
      }
    />
    <CardTable>
      <DataTableArea />
    </CardTable>
  </div>
}