import { TAgricolaRead } from "@/schema/agricola.schema";
import { create } from "zustand";

interface AgricolaStore {
  agricolas: TAgricolaRead[];
  fetchingAgricolas: boolean;
  setFetchingAgricolas: (payload: boolean) => void;
  setAgricolas: (payload: TAgricolaRead[]) => void;
  addAgricola: (payload: TAgricolaRead) => void;
  setAgricola: (payload: { trabajador_id: number; data: TAgricolaRead }) => void;
  removeAgricola: (payload: TAgricolaRead) => void;
}

export const useAgricolaStore = create<AgricolaStore>((set) => ({
agricolas: [] as TAgricolaRead[],
fetchingAgricolas: true,
  setFetchingAgricolas: (payload: boolean) => set({ fetchingAgricolas: payload }),
  setAgricolas: (payload: TAgricolaRead[]) => set({ agricolas: Array.isArray(payload) ? [...payload] : [] }),
  addAgricola: (payload: TAgricolaRead) => set((state) => ({ ...state, agricolas: state.agricolas.concat([payload]) })),
  setAgricola: (payload: { trabajador_id: number; data: TAgricolaRead }) => set((state) => {
    const newAgricolas = state.agricolas.filter(el => el.trabajador_id !== payload.trabajador_id);
    return { ...state, agricolas: [...newAgricolas, payload.data] };
  }),
  removeAgricola: (payload: TAgricolaRead) => set((state) => {
    const newAgricolas = state.agricolas.filter(el => el.trabajador_id !== payload.trabajador_id);
    return { ...state, agricolas: newAgricolas };
  }),
}));
