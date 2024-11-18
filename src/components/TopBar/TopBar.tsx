import { MoonIcon } from "@heroicons/react/24/outline";
import Paragraph from "../typography/Paragraph";
import ProfileBox from "../avatar/ProfileBox";
import Bell from "../bell/Bell";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { routesList } from "../../utils/routesList";

const TopBar = () => {
  const { pathname } = useLocation();
  const [pageTitle, setPageTitle] = useState<string>("داشبورد");
  useEffect(() => {
    const findCurrentPage = routesList.find((i) => i.path === pathname);
    if (findCurrentPage) {
      setPageTitle(findCurrentPage.title);
    }
  }, [pathname]);
  return (
    <div className="bg-white flex md:flex-row flex-col-reverse justify-between gap-4 flex-wrap items-center shadow-sm rounded-xl p-4 w-full sticky top-0 z-40">
      <Paragraph className="md:block hidden">{pageTitle}</Paragraph>
      <div className="md:w-fit w-full flex items-center md:justify-end justify-between gap-4 flex-wrap">
        <Bell />
        <MoonIcon className="md:block hidden size-9 bg-stone-100 rounded-full p-2" />
        <ProfileBox />
      </div>
    </div>
  );
};

export default TopBar;
