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
import Finance from "../pages/finance/Finance";
import FinanceReport from "../pages/finance/FinanceReport";
import Transaction from "../pages/finance/_components/Transaction";
import { Lang, translations } from "../context/translations";

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

export const routesList = (lang: Lang): RouteItemType[] => [
  {
    id: 1,
    title: translations[lang].dashboardTitle,
    path: "/",
    icon: HomeIcon,
    active: false,
    element: <Dashboard />,
  },
  {
    id: 2,
    title: translations[lang].supportTitle,
    path: "/support",
    active: false,
    icon: ChatBubbleBottomCenterTextIcon,
    element: <Supports />,
    subRoutes: [
      {
        id: 1,
        path: "/support/:id",
        title: translations[lang].supportTitle,
        active: false,
        element: <TicketDetail />,
      },
    ],
  },
  {
    id: 3,
    title: translations[lang].financeTitle,
    path: "/financial",
    icon: BanknotesIcon,
    active: false,
    element: <Financial />,
    subRoutes: [
      {
        id: 1,
        path: "/financialCrypto",
        title: translations[lang].subFinanceCryptoTitle,
        active: true,
        element: <Finance />,
      },
      {
        id: 2,
        path: "/financeReport",
        title: translations[lang].subFinanceReportTitle,
        active: true,
        element: <FinanceReport />,
      },
      {
        id: 3,
        path: "/financial/:id",
        title: translations[lang].financeTitle,
        active: false,
        element: <Transaction />,
      },
    ],
  },
  {
    id: 4,
    title: translations[lang].userManagmentTitle,
    path: "/usermanagment",
    active: false,
    icon: UserGroupIcon,
    element: <UsersManagment />,
  },
  {
    id: 5,
    title: translations[lang].AccountTitle,
    path: "/profile",
    active: false,
    icon: UserIcon,
    element: <MyProfile />,
  },
  {
    id: 6,
    title: translations[lang].MyNotificationTitle,
    path: "/MyNotification",
    active: false,
    icon: BellAlertIcon,
    element: <UserNotification />,
  },
];
