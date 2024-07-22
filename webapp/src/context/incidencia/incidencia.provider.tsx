"use client"
import { TIncidencia } from "@/schema/incidencia.schema";
import { ReactNode, useEffect } from "react";
import { useIncidenciaStore } from "./incidencia.store";

export const IncidenciaStoreProvider = ({ children, incidencias}: {
    children: ReactNode;
    incidencias: TIncidencia[];
}) => {
    const { setIncidencias, setFetchingIncidencias } = useIncidenciaStore();

    useEffect(() => {
        setIncidencias(incidencias);
        setFetchingIncidencias(false);
    }, [incidencias, setIncidencias, setFetchingIncidencias]);

    return <> {children} </>
}