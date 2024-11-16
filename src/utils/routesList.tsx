import React from "react";
import { SvgType } from "./enums";
import {
    BanknotesIcon,
  ChatBubbleBottomCenterTextIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export interface RouteItemType {
  title: "داشبورد";
  path: "/";
  icon: SvgType;
  element: React.ReactNode;
}

export const routesList = [
  { title: "داشبورد", path: "/", icon: HomeIcon, element: "" },
  {
    title: "پشتیبانی",
    path: "/support",
    icon: ChatBubbleBottomCenterTextIcon,
    element: "",
  },
  {
    title: "مالی",
    path: "/financial",
    icon: BanknotesIcon,
    element: "",
  },
  {
    title: "مدیریت کاربران",
    path: "/usermanagment",
    icon: UserGroupIcon,
    element: "",
  },
  {
    title: "حساب کاربری",
    path: "/profile",
    icon: UserIcon,
    element: "",
  },
];
