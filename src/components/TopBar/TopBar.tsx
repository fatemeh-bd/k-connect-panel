import ProfileBox from "../avatar/ProfileBox";
import Bell from "../bell/Bell";
import LangToggle from "./LangToggle";
import ThemeToggle from "./ThemeToggle";

const TopBar = () => {
  return (
    <div className="bg-white flex md:flex-row flex-col-reverse justify-between gap-4 flex-wrap items-center shadow-md  p-4 w-full sticky top-0 mt-4 z-40 rounded-lg">
      <div className="lg:block hidden"></div>
      <div className="lg:w-fit w-full flex items-center lg:justify-end justify-between gap-4 flex-wrap">
        <Bell />
        <div>
          <LangToggle />
          {/* Other components */}
        </div>
        <div className="lg:block hidden">
          <ThemeToggle />
        </div>
        <ProfileBox />
      </div>
    </div>
  );
};

export default TopBar;
