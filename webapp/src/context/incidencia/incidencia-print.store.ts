import { TIncidenciaRead } from "@/schema/incidencia.schema";
import { create } from "zustand";

interface IncidenciaPrintStore {
  incidencias: TIncidenciaRead[];
  print: boolean;
  setPrint: (payload: boolean) => void;
  setIncidencias: (payload: TIncidenciaRead[]) => void;
}

export const useIncidenciaPrintStore = create<IncidenciaPrintStore>((set) => ({
  incidencias: [] as TIncidenciaRead[],
  print: false,
  setPrint: (payload: boolean) => set({ print: payload }),
  setIncidencias: (payload: TIncidenciaRead[]) => set({ incidencias: [...payload]}),
}))