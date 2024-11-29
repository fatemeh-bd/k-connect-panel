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
import Transaction from "../pages/finance/_components/Transaction";
import Finance from "../pages/finance/Finance";
import FinanceReport from "../pages/finance/FinanceReport";

export interface RouteItemType {
  id: number;
  title: string;
  path: string;
  icon: SvgType;
  active: boolean;
  element: React.ReactNode;
  subRoutes?: {
    id: number;
    path: string;
    title: string;
    active: boolean;
    element: React.ReactNode;
  }[];
}

export const routesList: RouteItemType[] = [
  {
    id: 1,
    title: "داشبورد",
    path: "/",
    icon: HomeIcon,
    active:false,
    element: <Dashboard />,
  },
  {
    id: 2,
    title: "پشتیبانی",
    path: "/support",
    active:false,
    icon: ChatBubbleBottomCenterTextIcon,
    element: <Supports />,
    subRoutes: [
      {
        id: 1,
        path: "/support/:id",
        title: "پشتیبانی",
        active:false,
        element: <TicketDetail />,
      },
    ],
  },
  {
    id: 3,
    title: "امور مالی",
    path: "/financial",
    icon: BanknotesIcon,
    active:false,
    element: <Financial />,
    subRoutes: [
      {
        id: 1,
        path: "/financialCrypto",
        title: "رمز ارز",
        active:true,
        element: <Finance />,
      },
      {
        id: 2,
        path: "/financeReport",
        title: "گردش مالی",
        active:true,
        element: <FinanceReport />,
      },
    ],
  },
  {
    id: 4,
    title: "مدیریت کاربران",
    path: "/usermanagment",
    active:false,
    icon: UserGroupIcon,
    element: <UsersManagment />,
  },
  {
    id: 5,
    title: "حساب کاربری",
    path: "/profile",
    active:false,
    icon: UserIcon,
    element: <MyProfile />,
  },
  {
    id: 6,
    title: "اعلان های من",
    path: "/MyNotification",
     active:false,
    icon: BellAlertIcon,
    element: <UserNotification />,
  },
];

