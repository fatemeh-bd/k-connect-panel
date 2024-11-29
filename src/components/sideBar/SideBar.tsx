import { NavLink, useLocation } from "react-router-dom";
import { ColorType } from "../../utils/enums";
import { routesList, RouteItemType } from "../../utils/routesList";
import Paragraph from "../typography/Paragraph";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import ThemeToggle from "../TopBar/ThemeToggle";

const SideBar = () => {
  const [, removeCookie] = useCookies(["access_token"]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { pathname } = useLocation();
  const [pageTitle, setPageTitle] = useState<string>("داشبورد");
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const findCurrentPage = routesList.find((i) => i.path === pathname);
    if (findCurrentPage) {
      setPageTitle(findCurrentPage.title);
    }
  }, [pathname]);

  const toggleSubMenu = (id: number) => {
    setOpenSubMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenuItem = (item: RouteItemType) => (
    <li key={item.id} className="mb-2">
      {item.subRoutes && item.subRoutes.some(subItem => subItem.active) ? (
        <div>
          <button
            onClick={() => toggleSubMenu(item.id)}
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-secondary-100 rounded-lg"
          >
            <span className="flex items-center gap-2">
              {<item.icon className="size-5" />}
              {item.title}
            </span>
            <ChevronDownIcon
              className={`size-4 transition-transform ${
                openSubMenus[item.id] ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSubMenus[item.id] && (
            <ul className="mr-4 mt-2 space-y-2">
              {item.subRoutes
                .filter((subItem) => subItem.active)
                .map((subItem) => (
                  <li key={subItem.id}>
                    <NavLink
                      to={subItem.path}
                      className={({ isActive }) =>
                        isActive
                          ? "block bg-primary text-white px-4 py-2 rounded-lg"
                          : "block hover:bg-secondary-100 px-4 py-2 rounded-lg"
                      }
                      onClick={() => setShowMenu(false)}
                    >
                      {subItem.title}
                    </NavLink>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ) : (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-lg"
              : "flex items-center gap-2 hover:bg-secondary-100 px-4 py-3 rounded-lg"
          }
          onClick={() => setShowMenu(false)}
        >
          {<item.icon className="size-5" />}
          {item.title}
        </NavLink>
      )}
    </li>
  );

  return (
    <>
      <div className="lg:hidden w-full p-4 pb-0 flex justify-between items-center">
        <Bars3Icon
          className="size-12 bg-white rounded-full p-2 cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
        <Paragraph>{pageTitle}</Paragraph>
        <ThemeToggle />
      </div>

      <div
        className={`${
          showMenu ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-[300px] fixed lg:relative z-50 h-screen overflow-auto shadow-xl dark:shadow-black p-5 bg-white`}
      >
        <div className="lg:hidden flex justify-end mb-4">
          <XMarkIcon
            className="size-8 cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>

        <Paragraph
          type={ColorType.PRIMARY}
          className="font-bold !text-2xl mb-6 text-center"
        >
          پنل فروشندگان
        </Paragraph>

        <ul>
          {routesList.map(renderMenuItem)}
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

