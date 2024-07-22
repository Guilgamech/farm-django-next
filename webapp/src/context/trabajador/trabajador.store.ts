import { TTrabajador } from "@/schema/trabajador.schema";
import { create } from "zustand";

interface TrabajadorStore {
  trabajadores: TTrabajador[];
  fetchingTrabajadores: boolean;
  setFetchingTrabajadores: (payload: boolean) => void;
  setTrabajadores: (payload: TTrabajador[]) => void;
}

export const useTrabajadorStore = create<TrabajadorStore>((set) => ({
  trabajadores: [] as TTrabajador[],
  fetchingTrabajadores: true,
  setFetchingTrabajadores: (payload: boolean) => set({ fetchingTrabajadores: payload }),
  setTrabajadores: (payload: TTrabajador[]) => set({ trabajadores: payload }),
}));
