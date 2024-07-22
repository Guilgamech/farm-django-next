import { TCultivoRead } from "@/schema/cultivo.schema";
import { create } from "zustand";

interface CultivoPrintStore {
  cultivos: TCultivoRead[];
  print: boolean;
  setPrint: (payload: boolean) => void;
  setCultivos: (payload: TCultivoRead[]) => void;
}

export const useCultivoPrintStore = create<CultivoPrintStore>((set) => ({
  cultivos: [] as TCultivoRead[],
  print: false,
  setPrint: (payload: boolean) => set({ print: payload }),
  setCultivos: (payload: TCultivoRead[]) => set({ cultivos: [...payload]}),
}))