"use client";
import { CardTable } from "@/components/shared/card";
import { SelectFilterComponent } from "@/components/shared/selectFilter/basic";
import { useAreaCultivoPrintStore } from "@/context/cultivo";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import { useAreaStore } from "@/context/area";

export const WrapperPrintCultivosAreaReport = () => {
  const { areaCultivos, print, setPrint } = useAreaCultivoPrintStore();
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

  // Filtra los cultivos basados en el manager seleccionado
  const filteredCultivos = selectedArea
    ? areaCultivos.filter(areaCultivos => String(areaCultivos.area.id) === selectedArea)
    : areaCultivos;

  return (
    <CardTable>
      <div ref={refPrintContainer} className="w-full p-4">
        <div className="w-full flex flex-wrap justify-between gap-6 mt-5 px-5 py-8">
          <div>
            <h2 className="text-greenDark text-3xl mb-2">Empresa: Empresa Agrícola</h2>
            <h3 className="text-xl">Reporte: Cultivos por Area de la empresa</h3>
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

        {filteredCultivos.length > 0 ? (
          <div className="w-full border-2 border-primary flex flex-wrap justify-around gap-6 mt-5 px-5 py-8">
            {filteredCultivos.map(el => (
              <div key={`cultivo-${el.id}`} className="flex flex-col w-[30%] border-2 border-primary">
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Código:</b>
                  <span className="flex w-full">{el.crop.code}</span>
                </p>
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Estado:</b>
                  <span className="flex w-full">{el.crop.status}</span>
                </p>
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Área:</b>
                  <span className="flex w-full">{el.area.name}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg mt-5 text-center font-medium">No Hay Cultivos Disponibles</p>
        )}
      </div>
    </CardTable>
  );
};
