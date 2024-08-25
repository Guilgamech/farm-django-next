import { TAreaCultivoRead } from "@/schema/areacultivo.schema";
import { create } from "zustand";

interface AreaCultivoStore {
	areaCultivos: TAreaCultivoRead[];
  fetchingAreaCultivos: boolean;
	setFetchingAreaCultivos: (payload: boolean) => void;
	setAreaCultivos: (payload: TAreaCultivoRead[]) => void;
  addAreaCultivo: (payload:TAreaCultivoRead) => void;
  setAreaCultivo: (payload:{id:number, data:TAreaCultivoRead}) => void,
	removeAreaCultivo: (payload:TAreaCultivoRead) => void;  
}

export const useAreaCultivoStore = create<AreaCultivoStore>((set) => ({
	areaCultivos: [] as TAreaCultivoRead[],
  fetchingAreaCultivos: true,
	setFetchingAreaCultivos: (payload: boolean) => set({fetchingAreaCultivos: payload}),
	setAreaCultivos: (payload) => set({areaCultivos: payload}),
  addAreaCultivo: (payload:TAreaCultivoRead) => set((state)=> ({...state, areaCultivos: state.areaCultivos.concat([payload])})),
  setAreaCultivo: (payload) => set((state)=>{
    const newAreas = state.areaCultivos.filter(el => el.id !== payload.id);
    return {...state, areaCultivos: [...newAreas, payload.data]}
  }),
	removeAreaCultivo: (payload) => set((state)=>{
    const newAreas = state.areaCultivos.filter(el => el.id!== payload.id);
    return {...state, areaCultivos: newAreas}
  }),
}));
