import { TAreaCultivoRead } from "@/schema/areacultivo.schema";
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


interface AreaCultivoPrintStore {
  areaCultivos: TAreaCultivoRead[];
  print: boolean;
  setPrint: (payload: boolean) => void;
  setAreaCultivos: (payload: TAreaCultivoRead[]) => void;
}

export const useAreaCultivoPrintStore = create<AreaCultivoPrintStore>((set) => ({
  areaCultivos: [] as TAreaCultivoRead[],
  print: false,
  setPrint: (payload: boolean) => set({ print: payload }),
  setAreaCultivos: (payload: TAreaCultivoRead[]) => set({ areaCultivos: [...payload]}),
}))