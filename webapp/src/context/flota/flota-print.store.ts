import { TFlotaRead } from "@/schema/flota.schema";
import { create } from "zustand";

interface FlotaPrintStore {
  flotas: TFlotaRead[];
  print: boolean;
  setPrint: (payload: boolean) => void;
  setFlotas: (payload: TFlotaRead[]) => void;
}

export const useFlotaPrintStore = create<FlotaPrintStore>((set) => ({
  flotas: [] as TFlotaRead[],
  print: false,
  setPrint: (payload: boolean) => set({ print: payload }),
  setFlotas: (payload: TFlotaRead[]) => set({ flotas: [...payload]}),
}))