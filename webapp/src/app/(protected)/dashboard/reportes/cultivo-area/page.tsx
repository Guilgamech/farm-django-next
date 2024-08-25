"use client"

import { TitleActionBooking } from "@/components/shared/section";
import { WrapperPrintCultivosAreaReport } from "./_components/wrapper-print";
import { ButtonCultivoReportPrint } from "./_components/button-print";

export default function CultivoArea() {
  return (
    <div className="page-content">
      <TitleActionBooking
        title={<h2 className="fw-[700] mb-2 text-xl md:text-2xl">Cultvio por Area</h2>}
        subtitle={<p className="text-sm md:text-md">Informe de Cultvio por Area</p>}
        action={<ButtonCultivoReportPrint />}
      />
      <WrapperPrintCultivosAreaReport />
    </div >
  );
}
