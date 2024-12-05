import { StateCreator } from "zustand";
import { PAGING_ENUM } from "../types/global.types";

export interface PagePropTypes {
  currentPage: PAGING_ENUM;
  setCurrentPage: (value: PAGING_ENUM) => void;
}

export const usePage: StateCreator<PagePropTypes> = (set) => ({
  currentPage: PAGING_ENUM.USER,
  setCurrentPage: (value) => set({ currentPage: value }),
});
