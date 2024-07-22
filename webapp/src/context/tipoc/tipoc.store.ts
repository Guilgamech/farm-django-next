import { TTipoCultivo } from "@/schema/tipoc.schema";
import { create } from "zustand";

interface TipoCultivoStore {
  tipocultivos: TTipoCultivo[];
  fetchingTipoCultivos: boolean;
  setFetchingTipoCultivos: (payload: boolean) => void;
  setTipoCultivos: (payload: TTipoCultivo[]) => void;
  addTipoCultivo: (payload: TTipoCultivo) => void;
  setTipoCultivo: (payload: { id: number; data: TTipoCultivo }) => void;
  removeTipoCultivo: (payload: TTipoCultivo) => void;
}

export const useTipoCultivoStore = create<TipoCultivoStore>((set) => ({
  tipocultivos: [],
  fetchingTipoCultivos: true,
  setFetchingTipoCultivos: (payload: boolean) => set({ fetchingTipoCultivos: payload }),
  setTipoCultivos: (payload: TTipoCultivo[]) => set({ tipocultivos: payload }),
  addTipoCultivo: (payload: TTipoCultivo) => set((state) => ({
    tipocultivos: [...state.tipocultivos, payload],
  })),
  setTipoCultivo: (payload: { id: number; data: TTipoCultivo }) =>
    set((state) => {
      const newTipoCultivos = state.tipocultivos.filter((el) => el.id !== payload.id);
      return { tipocultivos: [...newTipoCultivos, payload.data] };
    }),
  removeTipoCultivo: (payload: TTipoCultivo) =>
    set((state) => ({
      tipocultivos: state.tipocultivos.filter((el) => el.id !== payload.id),
    })),
}));
