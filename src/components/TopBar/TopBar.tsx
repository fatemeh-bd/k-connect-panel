import Paragraph from "../typography/Paragraph";
import ProfileBox from "../avatar/ProfileBox";
import Bell from "../bell/Bell";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { routesList } from "../../utils/routesList";
import ThemeToggle from "./ThemeToggle";

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
    <div className="bg-white dark:bg-zinc-900 flex md:flex-row flex-col-reverse justify-between gap-4 flex-wrap items-center shadow-sm dark:shadow-md dark:shadow-black rounded-xl p-4 w-full sticky top-0 z-40">
      <Paragraph className="lg:block hidden ">{pageTitle}</Paragraph>
      <div className="lg:w-fit w-full flex items-center lg:justify-end justify-between gap-4 flex-wrap">
        <Bell />
        <div className="lg:block hidden">
        <ThemeToggle />
        </div>
        <ProfileBox />
      </div>
    </div>
  );
};

export default TopBar;
