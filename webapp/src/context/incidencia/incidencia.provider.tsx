"use client"
import { TIncidencia, TIncidenciaRead } from "@/schema/incidencia.schema";
import { ReactNode, useEffect } from "react";
import { useIncidenciaStore } from "./incidencia.store";
import { TArea } from "@/schema/area.schema";
import { useAreaStore } from "../area";

  export const IncidenciaStoreProvider = ({ 
    children,
    incidencias,
    areas ,
     }: {
    children: ReactNode;
    incidencias: TIncidenciaRead[];
    areas: TArea[],
}) => {
    const { setIncidencias, setFetchingIncidencias } = useIncidenciaStore();
    const {setAreas, setFetchingAreas} = useAreaStore();

    useEffect(() => {
        setIncidencias(incidencias);
        setFetchingIncidencias(false);
        setAreas(areas)
        setFetchingAreas(false)

    }, []);

    return <> {children} </>
};

