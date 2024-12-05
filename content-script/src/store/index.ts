import { create } from "zustand";
import { UserDetails, useUserDetails } from "./userDetails";
import { SidebarType, useSidebar } from "./sidebar";
import { PagePropTypes, usePage } from "./page";
import { UserCollectedType, useUserCollected } from "./userCollectedDetails";

export const useStore = create<
  UserDetails & SidebarType & PagePropTypes & UserCollectedType
>()((...a) => ({
  ...useUserDetails(...a),
  ...useSidebar(...a),
  ...usePage(...a),
  ...useUserCollected(...a),
}));
