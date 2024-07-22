import { DataTableIncidencia } from "./_components/table"; // Asegúrate de tener importado DataTableFlota correctamente
import { CardTable } from "@/components/shared/card";
import { TitleActionBooking } from "@/components/shared/section";

export default function Incidencias() {
  return (
    <div className="page-content">
      <TitleActionBooking
        title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Incidencias</h2>}
        subtitle={<p className="text-sm md:text-md">Gestionar las Incidencias de la Empresa</p>}
      />
      <CardTable>
        <DataTableIncidencia />
      </CardTable>
    </div>
  );
}
