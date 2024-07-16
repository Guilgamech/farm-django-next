import { TTipoFlota } from "@/schema/tipof.schema";
import { create } from "zustand";

interface TipoFlotaStore {
	tipoflotas: TTipoFlota[]
    fetchingTipoFlotas: boolean;
	setFetchingTipoFlotas: (payload: boolean) => void;
	setTipoFlotas: (payload: TTipoFlota[]) => void;
    addTipoFlota: (payload:TTipoFlota) => void;
    setTipoFlota: (payload:{id:number, data:TTipoFlota}) => void;
	removeTipoFlota: (payload:TTipoFlota) => void;  
}

export const useTipoFlotaStore = create<TipoFlotaStore>((set) => ({
	tipoflotas: [] as TTipoFlota[],
    fetchingTipoFlotas: true,
	setFetchingTipoFlotas: (payload: boolean) => set({fetchingTipoFlotas: payload}),
	setTipoFlotas: (payload: TTipoFlota[]) => set({tipoflotas: [...payload]}),
    addTipoFlota: (payload:TTipoFlota) => set((state)=> ({...state, tipoflotas: state.tipoflotas.concat([payload])})),
    setTipoFlota: (payload:{id:number, data:TTipoFlota}) => set((state)=>{
    const newTipoFlotas = state.tipoflotas.filter(el => el.id !== payload.id);
    return {...state, tipoflotas: [...newTipoFlotas, payload.data]}
  }),
	removeTipoFlota: (payload:TTipoFlota) => set((state)=>{
    const newTipoFlotas = state.tipoflotas.filter(el => el.id!== payload.id);
    return {...state, tipoflotas: newTipoFlotas}
  }),
}));
