import { TEnfermedadRead } from "@/schema/enfermedad.schema";
import { create } from "zustand";

interface EnfermedadStore {
  enfermedades: TEnfermedadRead[];
  fetchingEnfermedades: boolean;
  setFetchingEnfermedades: (payload: boolean) => void;
  setEnfermedades: (payload: TEnfermedadRead[]) => void;
  addEnfermedad: (payload: TEnfermedadRead) => void;
  setEnfermedad: (payload: { id: number; data: TEnfermedadRead }) => void;
  removeEnfermedad: (payload: TEnfermedadRead) => void;
}

export const useEnfermedadStore = create<EnfermedadStore>((set) => ({
enfermedades: [] as TEnfermedadRead[],
fetchingEnfermedades: true,
  setFetchingEnfermedades: (payload: boolean) => set({ fetchingEnfermedades: payload }),
  setEnfermedades: (payload: TEnfermedadRead[]) => set({ enfermedades: Array.isArray(payload) ? [...payload] : [] }),
  addEnfermedad: (payload: TEnfermedadRead) => set((state) => ({ ...state, enfermedades: state.enfermedades.concat([payload]) })),
  setEnfermedad: (payload: { id: number; data: TEnfermedadRead }) => set((state) => {
    const newEnfermedades = state.enfermedades.filter(el => el.id !== payload.id);
    return { ...state, enfermedades: [...newEnfermedades, payload.data] };
  }),
  removeEnfermedad: (payload: TEnfermedadRead) => set((state) => {
    const newEnfermedades = state.enfermedades.filter(el => el.id !== payload.id);
    return { ...state, enfermedades: newEnfermedades };
  }),
}));
