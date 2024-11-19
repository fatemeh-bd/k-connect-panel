import ProfileBox from "../avatar/ProfileBox";
import Bell from "../bell/Bell";
import ThemeToggle from "./ThemeToggle";

const TopBar = () => {

  return (
    <div className="light:bg-white   flex md:flex-row flex-col-reverse justify-between gap-4 flex-wrap items-center shadow-md  p-4 w-full sticky top-0 z-40">
      <div className="md:block hidden"></div>
      <div className="md:w-fit w-full flex items-center md:justify-end justify-between gap-4 flex-wrap">
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
