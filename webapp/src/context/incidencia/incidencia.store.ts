import { TIncidenciaRead } from "@/schema/incidencia.schema";
import { create } from "zustand";

interface IncidenciaStore {
  incidencias: TIncidenciaRead[];
  fetchingIncidencias: boolean;
  setFetchingIncidencias: (payload: boolean) => void;
  setIncidencias: (payload: TIncidenciaRead[]) => void;
  addIncidencia: (payload: TIncidenciaRead) => void;
  setIncidencia: (payload: { id: number; data: TIncidenciaRead }) => void;
  removeIncidencia: (payload: TIncidenciaRead) => void;
}

export const useIncidenciaStore = create<IncidenciaStore>((set) => ({
incidencias: [] as TIncidenciaRead[],
fetchingIncidencias: true,
  setFetchingIncidencias: (payload: boolean) => set({ fetchingIncidencias: payload }),
  setIncidencias: (payload: TIncidenciaRead[]) => set({ incidencias: Array.isArray(payload) ? [...payload] : [] }),
  addIncidencia: (payload: TIncidenciaRead) => set((state) => ({ ...state, incidencias: state.incidencias.concat([payload]) })),
  setIncidencia: (payload: { id: number; data: TIncidenciaRead }) => set((state) => {
    const newIncidencias = state.incidencias.filter(el => el.id !== payload.id);
    return { ...state, incidencias: [...newIncidencias, payload.data] };
  }),
  removeIncidencia: (payload: TIncidenciaRead) => set((state) => {
    const newIncidencias = state.incidencias.filter(el => el.id !== payload.id);
    return { ...state, incidencias: newIncidencias };
  }),
}));
