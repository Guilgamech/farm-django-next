import { TTratamientoRead } from "@/schema/tratamiento.schema";
import { create } from "zustand";

interface TratamientoStore {
  tratamientos: TTratamientoRead[];
  fetchingTratamientos: boolean;
  setFetchingTratamientos: (payload: boolean) => void;
  setTratamientos: (payload: TTratamientoRead[]) => void;
  addTratamiento: (payload: TTratamientoRead) => void;
  setTratamiento: (payload: { id: number; data: TTratamientoRead }) => void;
  removeTratamiento: (payload: TTratamientoRead) => void;
}

export const useTratamientoStore = create<TratamientoStore>((set) => ({
tratamientos: [] as TTratamientoRead[],
fetchingTratamientos: true,
  setFetchingTratamientos: (payload: boolean) => set({ fetchingTratamientos: payload }),
  setTratamientos: (payload: TTratamientoRead[]) => set({ tratamientos: Array.isArray(payload) ? [...payload] : [] }),
  addTratamiento: (payload: TTratamientoRead) => set((state) => ({ ...state, tratamientos: state.tratamientos.concat([payload]) })),
  setTratamiento: (payload: { id: number; data: TTratamientoRead }) => set((state) => {
    const newTratamientos = state.tratamientos.filter(el => el.id !== payload.id);
    return { ...state, tratamientos: [...newTratamientos, payload.data] };
  }),
  removeTratamiento: (payload: TTratamientoRead) => set((state) => {
    const newTratamientos = state.tratamientos.filter(el => el.id !== payload.id);
    return { ...state, tratamientos: newTratamientos };
  }),
}));
