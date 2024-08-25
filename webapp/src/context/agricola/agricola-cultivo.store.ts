import { TAgricolaCultivoRead } from "@/schema/agricolacultivo.schema";
import { create } from "zustand";

interface AgricolaCultivoStore {
	agricolaCultivos: TAgricolaCultivoRead[];
  fetchingAgricolaCultivos: boolean;
	setFetchingAgricolaCultivos: (payload: boolean) => void;
	setAgricolaCultivos: (payload: TAgricolaCultivoRead[]) => void;
  addAgricolaCultivo: (payload:TAgricolaCultivoRead) => void;
  setAgricolaCultivo: (payload:{id:number, data:TAgricolaCultivoRead}) => void,
	removeAgricolaCultivo: (payload:TAgricolaCultivoRead) => void;  
}

export const useAgricolaCultivoStore = create<AgricolaCultivoStore>((set) => ({
	agricolaCultivos: [] as TAgricolaCultivoRead[],
  fetchingAgricolaCultivos: true,
	setFetchingAgricolaCultivos: (payload: boolean) => set({fetchingAgricolaCultivos: payload}),
	setAgricolaCultivos: (payload) => set({agricolaCultivos: payload}),
  addAgricolaCultivo: (payload:TAgricolaCultivoRead) => set((state)=> ({...state, agricolaCultivos: state.agricolaCultivos.concat([payload])})),
  setAgricolaCultivo: (payload) => set((state)=>{
    const newAgricolas = state.agricolaCultivos.filter(el => el.id !== payload.id);
    return {...state, agricolaCultivos: [...newAgricolas, payload.data]}
  }),
	removeAgricolaCultivo: (payload) => set((state)=>{
    const newAgricolas = state.agricolaCultivos.filter(el => el.id!== payload.id);
    return {...state, agricolaCultivos: newAgricolas}
  }),
}));
