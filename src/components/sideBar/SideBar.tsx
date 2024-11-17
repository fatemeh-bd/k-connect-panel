import { NavLink } from "react-router-dom";
import { ColorType } from "../../utils/enums";
import { routesList } from "../../utils/routesList";
import Paragraph from "../typography/Paragraph";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCookies } from "react-cookie";
import { useState } from "react";

const SideBar = () => {
  const [, removeCookie] = useCookies(["access_token"]);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <div className="lg:hidden p-4 pb-0">
        <Bars3Icon
          className="size-12 bg-white rounded-full p-2 cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
      </div>

      <div
        className={`${
          showMenu ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:w-[20%] w-[300px] fixed lg:relative z-50 h-screen overflow-auto shadow-xl p-5 bg-white`}
      >
        <div className="lg:hidden flex justify-end mb-4">
          <XMarkIcon
            className="size-8 cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>

        <Paragraph
          type={ColorType.PRIMARY}
          className="font-bold !text-2xl mb-6"
        >
          K-connect
        </Paragraph>

        <ul>
          {routesList.map((item) => (
            <li
              key={item.id}
              className="[&>a]:flex [&>a]:items-center [&>a]:gap-2 mb-2"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white px-4 py-3 rounded-lg"
                    : "text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-lg"
                }
                onClick={() => setShowMenu(false)} 
              >
                {<item.icon className="size-5" />}
                {item.title}
              </NavLink>
            </li>
          ))}
          <li
            className="flex items-center gap-2 px-4 py-3 cursor-pointer"
            onClick={() => {
              removeCookie("access_token", "");
              setShowMenu(false);
            }}
          >
            <ArrowLeftStartOnRectangleIcon className="size-5 text-rose-500" />
            <Paragraph type={ColorType.ERROR}>خروج</Paragraph>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
