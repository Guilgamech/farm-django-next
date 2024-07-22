import { DataTableFlota } from "./_components/table"; // Asegúrate de tener importado DataTableFlota correctamente
import { CardTable } from "@/components/shared/card";
import { TitleActionBooking } from "@/components/shared/section";
import { FormModal } from "@/components/shared/modal";
import { FlotaForm } from "./_components/form/create";



export default function Flotas() {
  return (
    <div className="page-content">
      <TitleActionBooking
        title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Flotas</h2>}
        subtitle={<p className="text-sm md:text-md">Gestionar las Flotas de la Empresa</p>}
        action={<FormModal
          trigger={<button className="btn-default font-bold">Crear Flota</button>}
          heading={<span>Crear Flota Formulario</span>}>
          <FlotaForm />
        </FormModal>
        }
      />
      <CardTable>
        <DataTableFlota />
      </CardTable>
    </div>
  );
}
