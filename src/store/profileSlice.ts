import { create } from "zustand";

export type ProfileInfoType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  sellerInfo: { email: string; userName: string; registerDate: string };
  email: string;
  registerDate: string;
  userName: string;
  balance:string
};

type ProfileStore = {
  info: ProfileInfoType;
  setProfileInfo: (profile: ProfileInfoType) => void;
};
export const useProfile = create<ProfileStore>()((set) => ({
  info: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    sellerInfo: { email: "", userName: "", registerDate: "" },
    email: "",
    registerDate: "",
    userName: "",
    balance:""
  },
  setProfileInfo: (profile: ProfileInfoType) => set({ info: profile }),
}));
