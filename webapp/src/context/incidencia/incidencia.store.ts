import { TIncidencia } from "@/schema/incidencia.schema";
import { create } from "zustand";

interface IncidenciaStore{
    incidencias: TIncidencia[];
    fetchingIncidencias: boolean;
    setFetchingIncidencias: (payload: boolean) => void;
    setIncidencias: (payload: TIncidencia[]) => void;
}

export const useIncidenciaStore = create<IncidenciaStore>((set) => ({
    incidencias: [] as TIncidencia[],
    fetchingIncidencias: true,
    setFetchingIncidencias: (payload: boolean) => set({
        fetchingIncidencias: payload  
    }),
    setIncidencias: (payload: TIncidencia[]) => set({
        incidencias: [...payload]
    }),

}))