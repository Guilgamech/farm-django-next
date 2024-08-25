import { DataTableTratamiento } from "./_components/table"; // Asegúrate de tener importado DataTableFlota correctamente
import { CardTable } from "@/components/shared/card";
import { TitleActionBooking } from "@/components/shared/section";
import { FormModal } from "@/components/shared/modal";
import { TratamientoForm } from "./_components/form/create";

export default function Tratamientos() {
  return (
    <div className="page-content">
      <TitleActionBooking
        title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Tratamientos</h2>}
        subtitle={<p className="text-sm md:text-md">Gestionar las Tratamientos de la Empresa</p>}
        action={<FormModal
          trigger={<button className="btn-default font-bold">Crear Tratamiento</button>}
          heading={<span>Crear Tratamiento </span>}>
          <TratamientoForm />
        </FormModal>
        }
      />
      <CardTable>
        <DataTableTratamiento />
      </CardTable>
    </div>
  );
}
