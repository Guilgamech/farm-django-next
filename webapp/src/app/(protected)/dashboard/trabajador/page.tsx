import { DataTableTrabajador } from "./_components/table";
import { CardTable } from "@/components/shared/card";
import { TitleActionBooking } from "@/components/shared/section";

export default function Trabajadores() {
  return (
    <div className="page-content">
      <TitleActionBooking
        title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Trabajadores</h2>}
        subtitle={<p className="text-sm md:text-md">Gestionar los Trabajadores de la Empresa</p>}
      />
      <CardTable>
        <DataTableTrabajador />
      </CardTable>
    </div>
  );
}
