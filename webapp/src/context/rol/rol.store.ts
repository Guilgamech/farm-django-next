import { TRol } from "@/schema/rol.schema";
import { create } from "zustand";

interface RolStore {
  rols: TRol[];
  fetchingRols: boolean;
  setFetchingRols: (payload: boolean) => void;
  setRols: (payload: TRol[]) => void;
  addRol: (payload: TRol) => void;
  setRol: (payload: { id: number; data: TRol }) => void;
  removeRol: (payload: TRol) => void;
}

export const useRolStore = create<RolStore>((set) => ({
  rols: [],
  fetchingRols: true,
  setFetchingRols: (payload: boolean) => set({ fetchingRols: payload }),
  setRols: (payload: TRol[]) => set({ rols: payload }),
  addRol: (payload: TRol) => set((state) => ({
    rols: [...state.rols, payload],
  })),
  setRol: (payload: { id: number; data: TRol }) =>
    set((state) => {
      const newRols = state.rols.filter((el) => el.id !== payload.id);
      return { rols: [...newRols, payload.data] };
    }),
  removeRol: (payload: TRol) =>
    set((state) => ({
      rols: state.rols.filter((el) => el.id !== payload.id),
    })),
}));
