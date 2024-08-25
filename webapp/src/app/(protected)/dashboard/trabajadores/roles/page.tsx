import Link from "next/link";
import { DataTableRol } from "./_components/table";
import { CardTable } from "@/components/shared/card";
import { TitleActionBooking } from "@/components/shared/section";
import { FormModal } from "@/components/shared/modal";
import { RolForm } from "./_components/form/create";

export default function Rols() {
  return <div className="page-content">
    <TitleActionBooking
      title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Rol</h2>}
      subtitle={<p className="text-sm  md:text-md">Gestionar los Roles de la Empresa</p>}
      action={<FormModal
        trigger={<button className="btn-default font-bold">Crear Rol</button>}
        heading={<span>Crear Rol </span>}>
        <RolForm />
      </FormModal>
      }
    />
    <CardTable>
      <DataTableRol />
    </CardTable>
  </div>
}