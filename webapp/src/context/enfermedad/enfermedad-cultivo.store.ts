import { TEnfermedadCultivoRead } from "@/schema/enfermedadcultivo.schema";
import { create } from "zustand";

interface EnfermedadCultivoStore {
	enfermedadCultivos: TEnfermedadCultivoRead[];
  fetchingEnfermedadCultivos: boolean;
	setFetchingEnfermedadCultivos: (payload: boolean) => void;
	setEnfermedadCultivos: (payload: TEnfermedadCultivoRead[]) => void;
  addEnfermedadCultivo: (payload:TEnfermedadCultivoRead) => void;
  setEnfermedadCultivo: (payload:{id:number, data:TEnfermedadCultivoRead}) => void,
	removeEnfermedadCultivo: (payload:TEnfermedadCultivoRead) => void;  
}

export const useEnfermedadCultivoStore = create<EnfermedadCultivoStore>((set) => ({
	enfermedadCultivos: [] as TEnfermedadCultivoRead[],
  fetchingEnfermedadCultivos: true,
	setFetchingEnfermedadCultivos: (payload: boolean) => set({fetchingEnfermedadCultivos: payload}),
	setEnfermedadCultivos: (payload) => set({enfermedadCultivos: payload}),
  addEnfermedadCultivo: (payload:TEnfermedadCultivoRead) => set((state)=> ({...state, enfermedadCultivos: state.enfermedadCultivos.concat([payload])})),
  setEnfermedadCultivo: (payload) => set((state)=>{
    const newEnfermedades = state.enfermedadCultivos.filter(el => el.id !== payload.id);
    return {...state, enfermedadCultivos: [...newEnfermedades, payload.data]}
  }),
	removeEnfermedadCultivo: (payload) => set((state)=>{
    const newEnfermedades = state.enfermedadCultivos.filter(el => el.id!== payload.id);
    return {...state, enfermedadCultivos: newEnfermedades}
  }),
}));
