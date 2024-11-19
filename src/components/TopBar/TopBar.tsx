import { MoonIcon } from "@heroicons/react/24/outline";
import ProfileBox from "../avatar/ProfileBox";
import Bell from "../bell/Bell";

const TopBar = () => {

  return (
    <div className="bg-white flex md:flex-row flex-col-reverse justify-between gap-4 flex-wrap items-center shadow-md  p-4 w-full sticky top-0 z-40">
      <div className="md:block hidden"></div>
      <div className="md:w-fit w-full flex items-center md:justify-end justify-between gap-4 flex-wrap">
        <Bell />
        <MoonIcon className="md:block hidden size-9 bg-stone-100 rounded-full p-2" />
        <ProfileBox />
      </div>
    </div>
  );
};

export default TopBar;
