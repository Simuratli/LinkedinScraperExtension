import { StateCreator } from "zustand";
import { MainUserDataType } from "../types/global.types";

export interface UserDetails {
  profileImage: string;
  setProfileImage: (e: string) => void;
  mobile: string;
  setMobile: (e: string) => void;
  birthDate: string;
  setBirthDate: (e: string) => void;
  company: string;
  setCompany: (e: string) => void;
  email: string;
  setEmail: (e: string) => void;
  firstName: string;
  setFirstName: (e: string) => void;
  headline: string;
  setHeadline: (e: string) => void;
  lastName: string;
  setLastname: (e: string) => void;
  publicIdentifier: string;
  setPublicIdentifier: (e: string) => void;
  summary: string;
  setSummary: (e: string) => void;
  setAll: (e: MainUserDataType) => void;
  setReset: () => void;
}

export const useUserDetails: StateCreator<UserDetails> = (set) => ({
  profileImage: "",
  mobile: "",
  birthDate: "",
  company: "",
  email: "",
  firstName: "",
  headline: "",
  lastName: "",
  publicIdentifier: "",
  summary: "",
  setProfileImage: (value) => set({ profileImage: value }),
  setMobile: (value) => set({ mobile: value }),
  setBirthDate: (value) => set({ birthDate: value }),
  setCompany: (value) => set({ company: value }),
  setEmail: (value) => set({ email: value }),
  setFirstName: (value) => set({ firstName: value }),
  setHeadline: (value) => set({ headline: value }),
  setLastname: (value) => set({ lastName: value }),
  setPublicIdentifier: (value) => set({ publicIdentifier: value }),
  setSummary: (value) => set({ summary: value }),
  setAll: (value) =>
    set({
      mobile: value.MOBILE,
      birthDate: value.birthDate,
      company: value.company,
      email: value.email,
      firstName: value.firstName,
      headline: value.headline,
      lastName: value.lastName,
      publicIdentifier: value.publicIdentifier,
      summary: value.summary,
    }),
  setReset: () =>
    set({
      profileImage: "",
      mobile: "",
      birthDate: "",
      company: "",
      email: "",
      firstName: "",
      headline: "",
      lastName: "",
      publicIdentifier: "",
      summary: "",
    }),
});
