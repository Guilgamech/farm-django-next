import { TOficinaRead } from "@/schema/oficina.schema";
import { create } from "zustand";

interface OficinaStore {
  oficinas: TOficinaRead[];
  fetchingOficinas: boolean;
  setFetchingOficinas: (payload: boolean) => void;
  setOficinas: (payload: TOficinaRead[]) => void;
  addOficina: (payload: TOficinaRead) => void;
  setOficina: (payload: { trabajador_id: number; data: TOficinaRead }) => void;
  removeOficina: (payload: TOficinaRead) => void;
}

export const useOficinaStore = create<OficinaStore>((set) => ({
oficinas: [] as TOficinaRead[],
fetchingOficinas: true,
  setFetchingOficinas: (payload: boolean) => set({ fetchingOficinas: payload }),
  setOficinas: (payload: TOficinaRead[]) => set({ oficinas: Array.isArray(payload) ? [...payload] : [] }),
  addOficina: (payload: TOficinaRead) => set((state) => ({ ...state, oficinas: state.oficinas.concat([payload]) })),
  setOficina: (payload: { trabajador_id: number; data: TOficinaRead }) => set((state) => {
    const newOficinas = state.oficinas.filter(el => el.trabajador_id !== payload.trabajador_id);
    return { ...state, oficinas: [...newOficinas, payload.data] };
  }),
  removeOficina: (payload: TOficinaRead) => set((state) => {
    const newOficinas = state.oficinas.filter(el => el.trabajador_id !== payload.trabajador_id);
    return { ...state, oficinas: newOficinas };
  }),
}));
