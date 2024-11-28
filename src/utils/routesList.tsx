import React from "react";
import { SvgType } from "./enums";
import {
  BanknotesIcon,
  ChatBubbleBottomCenterTextIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";
import Dashboard from "../pages/dashboard/Dashboard";
import UsersManagment from "../pages/usersManagment/UsersManagment";
import UserNotification from "../pages/UserNotifcation/UserNotification";
import Supports from "../pages/Supports/Support";
import TicketDetail from "../pages/Supports/TiketDetail";
import MyProfile from "../pages/profile/MyProfile";
import Financial from "../pages/finance/Finance";

export interface RouteItemType {
  title: "داشبورد";
  path: "/";
  icon: SvgType;
  element: React.ReactNode;
}

export const routesList = [
  {
    id: 1,
    title: "داشبورد",
    path: "/",
    icon: HomeIcon,
    element: <Dashboard />,
  },
  {
    id: 2,
    title: "پشتیبانی",
    path: "/support",
    icon: ChatBubbleBottomCenterTextIcon,
    element: <Supports />,
    subRoutes: [
      {
        id: 1,
        path: "/support/:id",
        element: <TicketDetail />,
      },
    ],
  },
  {
    id: 3,
    title: "مالی",
    path: "/financial",
    icon: BanknotesIcon,
    element: <Financial />,
  },
  {
    id: 4,
    title: "مدیریت کاربران",
    path: "/usermanagment",
    icon: UserGroupIcon,
    element: <UsersManagment />,
  },
  {
    id: 5,
    title: "حساب کاربری",
    path: "/profile",
    icon: UserIcon,
    element: <MyProfile />,
  },
  {
    id: 6,
    title: "اعلان های من",
    path: "/MyNotification",
    icon: BellAlertIcon,
    element: <UserNotification />,
  },
];
