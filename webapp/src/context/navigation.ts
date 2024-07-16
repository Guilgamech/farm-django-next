import { create } from 'zustand';

interface NavigationStore {
  activePath: string | undefined;
  setActivePath: (payload: string) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  activePath: "",
  setActivePath: (payload: string) => set({activePath: payload }),
}));