import { MoonIcon } from "@heroicons/react/24/outline";
import Paragraph from "../typography/Paragraph";
import ProfileBox from "../avatar/ProfileBox";
import Bell from "../bell/Bell";

const TopBar = () => {
  return (
    <div className="bg-white flex justify-between gap-4 flex-wrap items-center shadow-sm rounded-xl p-4 w-full">
      <Paragraph>داشبورد</Paragraph>
      <div className="flex items-center gap-4">
        <Bell />
        <MoonIcon className="size-9 bg-stone-100 rounded-full p-2" />
        <ProfileBox />
      </div>
    </div>
  );
};

export default TopBar;
