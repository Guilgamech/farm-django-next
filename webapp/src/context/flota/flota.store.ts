import { TFlota, TFlotaRead } from "@/schema/flota.schema";
import { create } from "zustand";

interface FlotaStore {
  flotas: TFlotaRead[];
  fetchingFlotas: boolean;
  setFetchingFlotas: (payload: boolean) => void;
  setFlotas: (payload: TFlotaRead[]) => void;
  addFlota: (payload: TFlotaRead) => void;
  setFlota: (payload: { id: number; data: TFlotaRead }) => void;
  removeFlota: (payload: TFlotaRead) => void;
}

export const useFlotaStore = create<FlotaStore>((set) => ({
  flotas: [] as TFlotaRead[],
  fetchingFlotas: true,
  setFetchingFlotas: (payload: boolean) => set({ fetchingFlotas: payload }),
  setFlotas: (payload: TFlotaRead[]) => set({ flotas: Array.isArray(payload) ? [...payload] : [] }),
  addFlota: (payload: TFlotaRead) => set((state) => ({ ...state, flotas: state.flotas.concat([payload]) })),
  setFlota: (payload: { id: number; data: TFlotaRead }) => set((state) => {
    const newFlotas = state.flotas.filter(el => el.id !== payload.id);
    return { ...state, flotas: [...newFlotas, payload.data] };
  }),
  removeFlota: (payload: TFlotaRead) => set((state) => {
    const newFlotas = state.flotas.filter(el => el.id !== payload.id);
    return { ...state, flotas: newFlotas };
  }),
}));
