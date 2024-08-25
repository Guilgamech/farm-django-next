import Link from "next/link";
import { DataTableTipoCultivo } from "./_components/table";
import { CardTable } from "@/components/shared/card";
import { TitleActionBooking } from "@/components/shared/section";
import { FormModal } from "@/components/shared/modal";
import { TipoCultivoForm } from "./_components/form/create";

export default function TipoCultivos() {
  return <div className="page-content">
    <TitleActionBooking
      title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Tipo de Cultivos</h2>}
      subtitle={<p className="text-sm  md:text-md">Gestionar las Tipo de Cultivos de la Empresa</p>}
      action={<FormModal
        trigger={<button className="btn-default font-bold">Crear Tipo De Cultivo</button>}
        heading={<span>Crear Tipo De Cultivo </span>}>
        <TipoCultivoForm />
      </FormModal>
      }
    />
    <CardTable>
      <DataTableTipoCultivo />
    </CardTable>
  </div>
}