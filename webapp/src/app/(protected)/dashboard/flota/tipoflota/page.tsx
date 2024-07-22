import Link from "next/link";
import { DataTableTipoFlota } from "./_components/table";
import { CardTable } from "@/components/shared/card";
import { TitleActionBooking } from "@/components/shared/section";
import { FormModal } from "@/components/shared/modal";
import { TipoFlotaForm } from "./_components/form/create";

export default function TipoFlotas() {
  return <div className="page-content">
    <TitleActionBooking
      title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Tipo de Flotas</h2>}
      subtitle={<p className="text-sm  md:text-md">Gestionar las Tipo de Flotas de la Empresa</p>}
      action={<FormModal
        trigger={<button className="btn-default font-bold">Crear Tipo De Flota</button>}
        heading={<span>Crear Tipo De Flota Formulario</span>}>
        <TipoFlotaForm />
      </FormModal>
      }
    />
    <CardTable>
      <DataTableTipoFlota />
    </CardTable>
  </div>
}