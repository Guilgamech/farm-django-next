"use client"

import { TitleActionBooking } from "@/components/shared/section";
import { WrapperPrintCultivosRecogidosReport } from "./_components/wrapper-print";
import { ButtonCultivoReportPrint } from "./_components/button-print";

export default function CultivoRecogidos() {
  return (
    <div className="page-content">
      <TitleActionBooking
        title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Cultivos Recogidos</h2>}
        subtitle={<p className="text-sm md:text-md">Informe de Cultivos Recogidos </p>}
        action={<ButtonCultivoReportPrint />}
      />
      <WrapperPrintCultivosRecogidosReport />
    </div >
  );
}
