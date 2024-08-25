import { DataTableEnfermedad } from "./_components/table"; // Asegúrate de tener importado DataTableFlota correctamente
import { CardTable } from "@/components/shared/card";
import { TitleActionBooking } from "@/components/shared/section";
import { FormModal } from "@/components/shared/modal";
import { EnfermedadForm } from "./_components/form/create";

export default function Enfermedades() {
  return (
    <div className="page-content">
      <TitleActionBooking
        title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Enfermedades</h2>}
        subtitle={<p className="text-sm md:text-md">Gestionar las Enfermedades de la Empresa</p>}
        action={<FormModal
          trigger={<button className="btn-default font-bold">Crear Enfermedad</button>}
          heading={<span>Crear Enfermedad </span>}>
          <EnfermedadForm />
        </FormModal>
        }
      />
      <CardTable>
        <DataTableEnfermedad />
      </CardTable>
    </div>
  );
}
