import { StateCreator } from "zustand";
import { UserDetails } from "./userDetails";

export interface UserCollectedType {
  userCollectedDetails: UserDetails[];
  setUserCollectedDetails: (e: UserDetails) => void;
  setResetDetails: () => void;
}

export const useUserCollected: StateCreator<UserCollectedType> = (set) => ({
  userCollectedDetails: [],
  setUserCollectedDetails: (value) =>
    set((state) => ({
      userCollectedDetails:
        state.userCollectedDetails.filter(
          (i) => i.publicIdentifier === value.publicIdentifier,
        ).length === 0
          ? [...state.userCollectedDetails, value]
          : [...state.userCollectedDetails],
    })),
  setResetDetails: () => set({ userCollectedDetails: [] }),
});
