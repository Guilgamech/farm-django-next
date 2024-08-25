"use client"
import { DataTableCultivo } from "./_components/table"; // Asegúrate de tener importado DataTableFlota correctamente
import { CardTable } from "@/components/shared/card";
import { FormModal } from "@/components/shared/modal";
import { TitleActionBooking } from "@/components/shared/section";
import { CultivoForm } from "./_components/form/create";


export default function Cultivos() {
  return (
    <div className="page-content">
      <TitleActionBooking
        title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Cultivos</h2>}
        subtitle={<p className="text-sm md:text-md">Gestionar las Cultivos de la Empresa</p>}
        action={<FormModal
          trigger={<button className="btn-default font-bold">Crear Cultivo</button>}
          heading={<span>Crear Cultivo </span>}>
          <CultivoForm />
        </FormModal>
        }
      />
      <CardTable>
        <DataTableCultivo />
      </CardTable>
    </div>
  );
}
