import { StateCreator } from "zustand";

export interface SidebarType {
  openSidebar: boolean;
  setOpenSidebar: (e: boolean) => void;
}

export const useSidebar: StateCreator<SidebarType> = (set) => ({
  openSidebar: false,
  setOpenSidebar: (value) => set({ openSidebar: value }),
});
