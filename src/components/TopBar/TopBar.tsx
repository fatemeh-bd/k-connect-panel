import { MoonIcon } from "@heroicons/react/24/outline";
import { Sizes } from "../../utils/enums";
import Paragraph from "../typography/Paragraph";

const TopBar = () => {
  return (
    <div className="bg-white flex justify-between gap-4 flex-wrap items-center shadow-sm rounded-xl p-4 w-full">
      <Paragraph>داشبورد</Paragraph>
      <div className="flex items-center gap-4">
        <Paragraph size={Sizes.sm}>
          موجودی شما:
          <span className="text-primary">۱۳,۰۰۰ تومان</span>
        </Paragraph>
        <MoonIcon className="size-6" />
      </div>
    </div>
  );
};

export default TopBar;
