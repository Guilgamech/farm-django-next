"use client"
import { CardTable } from "@/components/shared/card";
import { SelectFilterComponent } from "@/components/shared/selectFilter/basic";
import { useCultivoPrintStore } from "@/context/cultivo";
import { useEffect, useRef, useState } from "react"
import { useReactToPrint } from 'react-to-print';
const statusOptions = [
  { id: 'sembrado', name: 'Sembrado' },
  { id: 'cosechado', name: 'Cosechado' },
  { id: 'recogido', name: 'Recogido' }
]


export const WrapperPrintCultivosRecogidosReport = () => {
  const { cultivos, print, setPrint } = useCultivoPrintStore();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const refPrintContainer = useRef<HTMLDivElement | null>(null)
  const handlePrint = useReactToPrint({
    documentTitle: "Print Result",
    removeAfterPrint: true,
  });
  useEffect(() => {
    if (print && refPrintContainer.current) {
      handlePrint(null, () => refPrintContainer.current)
      setPrint(false)
    }
  }, [print, refPrintContainer.current])

  const filteredCultivos = selectedStatus 
    ? cultivos.filter(cultivo => cultivo.status === selectedStatus) 
    : cultivos;

  return <CardTable>
    <div ref={refPrintContainer} className="w-full p-4">
      <div className="w-full flex flex-wrap justify-between gap-6 mt-5 px-5 py-8">
        <div>
        <h2 className="text-greenDark text-3xl mb-2">Empresa: Empresa Agrícola</h2>
        <h3 className="text-xl">Reporte: Cultivos Recogidos de la empresa </h3>
        </div>

      <div>
      <SelectFilterComponent
              classes={{
                trigger: "w-full",
                menuContainer: "w-full"
              }}
              options={statusOptions}
              value={selectedStatus ? statusOptions.find(el => el.id === selectedStatus) : null}
              onChange={(option) => setSelectedStatus(option?.id ?? null)}
              emptyOption="Selecciona un estado"
              getOptionLabel={(option) => option?.name ?? ""}
              getOptionValue={(option) => option?.id ?? ""}
                  />
      </div>
      </div>

      {filteredCultivos.length > 0 ? (
          <div className="w-full border-2 border-primary flex flex-wrap justify-around gap-6 mt-5 px-5 py-8">
            {filteredCultivos.map(el => (
              <div key={`cultivo-${el.id}`} className="flex flex-col w-[30%] border-2 border-primary">
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Código:</b>
                  <span className="flex w-full">{el.code}</span>
                </p>
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Nombre:</b>
                  <span className="flex w-full">{el.name}</span>
                </p>
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Tipo:</b>
                  <span className="flex w-full">{el.type.name}</span>
                </p>
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Estado:</b>
                  <span className="flex w-full">{el.status}</span>
                </p>
                <p className="flex px-2 justify-start gap-2 pt-2 mb-2">
                  <b className="flex min-w-[100px] justify-end">Responsable:</b>
                  <span className="flex w-full">{el.manager.name}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg mt-5 text-center font-medium">No Hay Cultivos Disponibles</p>
        )}
    </div>
  </CardTable>
}