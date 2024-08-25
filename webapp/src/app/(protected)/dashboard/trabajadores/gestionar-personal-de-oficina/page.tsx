import { DataTableOficina } from "./_components/table"; // Asegúrate de tener importado DataTableFlota correctamente
import { CardTable } from "@/components/shared/card";
import { TitleActionBooking } from "@/components/shared/section";
import { FormModal } from "@/components/shared/modal";
import { OficinaForm } from "./_components/form/create";

export default function Oficinas() {
  return (
    <div className="page-content">
      <TitleActionBooking
        title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Trabajadores Oficinas</h2>}
        subtitle={<p className="text-sm md:text-md">Gestionar los Trabajadores Oficinas de la Empresa</p>}
        action={<FormModal
          trigger={<button className="btn-default font-bold">Crear Trabajador Oficina</button>}
          heading={<span>Crear Oficina </span>}>
          <OficinaForm />
        </FormModal>
        }
      />
      <CardTable>
        <DataTableOficina />
      </CardTable>
    </div>
  );
}
