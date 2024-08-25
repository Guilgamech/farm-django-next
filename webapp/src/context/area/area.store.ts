import { TArea } from "@/schema/area.schema";
import { create } from "zustand";

interface AreaStore {
	areas: TArea[]
  fetchingAreas: boolean;
	setFetchingAreas: (payload: boolean) => void;
	setAreas: (payload: TArea[]) => void;
  addArea: (payload:TArea) => void;
  setArea: (payload:{id:number, data:TArea}) => void;
	removeArea: (payload:TArea) => void;  
}

export const useAreaStore = create<AreaStore>((set) => ({
	areas: [] as TArea[],
  fetchingAreas: true,
	setFetchingAreas: (payload: boolean) => set({fetchingAreas: payload}),
	setAreas: (payload: TArea[]) => set({areas: payload}),
  addArea: (payload:TArea) => set((state)=> ({...state, areas: state.areas.concat([payload])})),
  setArea: (payload:{id:number, data:TArea}) => set((state)=>{
    const newAreas = state.areas.filter(el => el.id !== payload.id);
    return {...state, areas: [...newAreas, payload.data]}
  }),
	removeArea: (payload:TArea) => set((state)=>{
    const newAreas = state.areas.filter(el => el.id!== payload.id);
    return {...state, areas: newAreas}
  }),
}));
