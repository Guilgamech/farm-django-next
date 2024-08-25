"use client";
import { CardTable } from "@/components/shared/card";
import { SelectFilterComponent } from "@/components/shared/selectFilter/basic";
import { useIncidenciaPrintStore } from "@/context/incidencia";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import { useAreaStore } from "@/context/area";
import { formatDateToString } from "@/lib/utils";

export const WrapperPrintIncidenciaAreaReport = () => {
  const { incidencias, print, setPrint } = useIncidenciaPrintStore();
  const { areas } = useAreaStore();
  const [selectedArea, setSelectedArea] = useState<string | null>(null); // Estado para el manager seleccionado
  const refPrintContainer = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => refPrintContainer.current!,
    documentTitle: "Print Result",
    removeAfterPrint: true,
  });

  useEffect(() => {
    if (print && refPrintContainer.current) {
      handlePrint();
      setPrint(false);

    }
  }, [print, handlePrint]);

  // Filtra los incidencias basados en el manager seleccionado
  const filteredIncidencias = selectedArea
    ? incidencias.filter(incidencia => String(incidencia.area.id) === selectedArea)
    : incidencias;

  return (
    <CardTable>
      <div ref={refPrintContainer} className="w-full p-4">
        <div className="w-full flex flex-wrap justify-between gap-6 mt-5 px-5 py-8">
          <div>
            <h2 className="text-greenDark text-3xl mb-2">Empresa: Empresa Agrícola</h2>
            <h3 className="text-xl">Reporte: Incidencias de las Areas  de la empresa</h3>
          </div>

          <div>
            <SelectFilterComponent
              classes={{
                trigger: "w-full",
                menuContainer: "w-full"
              }}
              options={areas}
              value={areas.find(el => String(el.id) === selectedArea) ?? null}
              onChange={(option) => setSelectedArea(option?.id ? String(option.id) : null)}
              emptyOption="Seleccione el Area"
              getOptionLabel={(option) => option?.name ?? ""}
              getOptionValue={(option) => String(option?.id) ?? ""}
            />
          </div>
        </div>

        {filteredIncidencias.length > 0 ? (
          <div className="w-full border-2 border-primary flex flex-wrap justify-around gap-6 mt-5 px-5 py-8">
            {filteredIncidencias.map(el => (
              <div key={`incidencia-${el.id}`} className="flex flex-col w-[30%] border-2 border-primary">
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Tipo:</b>
                  <span className="flex w-full">{el.type}</span>
                </p>
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Fecha:</b>
                  <span className="flex w-full">    
                  {(() => {
                      const date = new Date(el.date);
                      const formatedDate = date ? formatDateToString(date) : ''
                      return formatedDate;
                    })()}         
                  </span>
                </p>
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Estado:</b>
                  <span className="flex w-full">{el.status}</span>
                </p>
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Daño:</b>
                  <span className="flex w-full">{el.damage}</span>
                </p>
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Area:</b>
                  <span className="flex w-full">{el.area.name}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg mt-5 text-center font-medium">No Hay Incidencias Disponibles</p>
        )}
      </div>
    </CardTable>
  );
};
