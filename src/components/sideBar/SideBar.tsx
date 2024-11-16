import { NavLink } from "react-router-dom";
import { ColorType } from "../../utils/enums";
import { routesList } from "../../utils/routesList";
import Paragraph from "../typography/Paragraph";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

const SideBar = () => {
  return (
    <div className="w-[20%] h-screen overflow-auto shadow-xl p-5 bg-white">
      <Paragraph type={ColorType.PRIMARY} className="font-bold !text-2xl mb-4">
        K-connect
      </Paragraph>
      <ul>
        {routesList.map((item) => (
          <li
            key={item.path}
            className="[&>a]:flex [&>a]:items-center [&>a]:gap-2 mb-2"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white px-4 py-3 rounded-lg"
                  : "text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-lg"
              }
            >
              {<item.icon className="size-5" />}
              {item.title}
            </NavLink>
          </li>
        ))}
        <li className="flex items-center gap-2 px-4 py-3 cursor-pointer">
          <ArrowLeftStartOnRectangleIcon className="size-5 text-rose-500" />
          <Paragraph type={ColorType.ERROR}>خروج</Paragraph>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
