import { TCultivo, TCultivoRead } from "@/schema/cultivo.schema";
import { create } from "zustand";

// Cultivo Store interface
interface CultivoStore {
  cultivos: TCultivoRead[];
  fetchingCultivos: boolean;
  setFetchingCultivos: (payload: boolean) => void;
  setCultivos: (payload: TCultivoRead[]) => void;
  addCultivo: (payload: TCultivoRead) => void;
  setCultivo: (payload: { id: number; data: TCultivoRead }) => void;
  removeCultivo: (payload: TCultivoRead) => void;
}

// Cultivo Store
export const useCultivoStore = create<CultivoStore>((set) => ({
  cultivos: [] as TCultivoRead[],
  fetchingCultivos: true,
  setFetchingCultivos: (payload: boolean) => set({ fetchingCultivos: payload }),
  setCultivos: (payload: TCultivoRead[]) => set({ cultivos: Array.isArray(payload) ? [...payload] : [] }),
  addCultivo: (payload: TCultivoRead) => set((state) => ({ ...state, cultivos: state.cultivos.concat([payload]) })),
  setCultivo: (payload: { id: number; data: TCultivoRead }) => set((state) => {
    const newCultivos = state.cultivos.filter(el => el.id !== payload.id);
    return { ...state, cultivos: [...newCultivos, payload.data] };
  }),
  removeCultivo: (payload: TCultivoRead) => set((state) => {
    const newCultivos = state.cultivos.filter(el => el.id !== payload.id);
    return { ...state, cultivos: newCultivos };
  }),
}));
