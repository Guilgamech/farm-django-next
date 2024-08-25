"use client";
import { ReactNode, useEffect } from "react";
import { TIncidenciaRead } from "@/schema/incidencia.schema";
import { useIncidenciaPrintStore } from "./incidencia-print.store";
import { TArea } from "@/schema/area.schema";
import { useAreaStore } from "../area";

export const IncidenciaPrintStoreProvider = ({
  children,
  incidencias,
  areas,
}: {
    children: ReactNode,
    incidencias: TIncidenciaRead[],
    areas: TArea[],
  }) => {
  const { setIncidencias } = useIncidenciaPrintStore();
  const { setAreas, setFetchingAreas } = useAreaStore();

  useEffect(() => {
    setIncidencias(incidencias),
    setAreas(areas)
    setFetchingAreas(false)
  }, []);
  return <>{children}</>;
};