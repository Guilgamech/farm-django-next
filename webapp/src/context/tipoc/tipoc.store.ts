import { TTipoCultivo } from "@/schema/tipoc.schema";
import { create } from "zustand";

interface TipoCultivoStore {
	tipocultivos: TTipoCultivo[]
    fetchingTipoCultivos: boolean;
	setFetchingTipoCultivos: (payload: boolean) => void;
	setTipoCultivos: (payload: TTipoCultivo[]) => void;
    addTipoCultivo: (payload:TTipoCultivo) => void;
    setTipoCultivo: (payload:{id:number, data:TTipoCultivo}) => void;
	removeTipoCultivo: (payload:TTipoCultivo) => void;  
}

export const useTipoCultivoStore = create<TipoCultivoStore>((set) => ({
	tipocultivos: [] as TTipoCultivo[],
    fetchingTipoCultivos: true,
	setFetchingTipoCultivos: (payload: boolean) => set({fetchingTipoCultivos: payload}),
	setTipoCultivos: (payload: TTipoCultivo[]) => set({tipocultivos: [...payload]}),
    addTipoCultivo: (payload:TTipoCultivo) => set((state)=> ({...state, tipocultivos: state.tipocultivos.concat([payload])})),
    setTipoCultivo: (payload:{id:number, data:TTipoCultivo}) => set((state)=>{
    const newTipoCultivos = state.tipocultivos.filter(el => el.id !== payload.id);
    return {...state, tipocultivos: [...newTipoCultivos, payload.data]}
  }),
	removeTipoCultivo: (payload:TTipoCultivo) => set((state)=>{
    const newTipoCultivos = state.tipocultivos.filter(el => el.id!== payload.id);
    return {...state, tipocultivos: newTipoCultivos}
  }),
}));
