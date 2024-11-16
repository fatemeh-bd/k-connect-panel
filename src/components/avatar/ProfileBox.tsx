import Avatar from "./Avatar";
import Paragraph from "../typography/Paragraph";
import { ColorType, Sizes } from "../../utils/enums";

const ProfileBox = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="text-left">
        <Paragraph size={Sizes.sm} className="font-medium">
          مجید گرگین
        </Paragraph>
        <Paragraph>
          <Paragraph size={Sizes.xs} type={ColorType.PRIMARY}>
            موجودی شما:
            <span>۱۳,۰۰۰ تومان</span>
          </Paragraph>
        </Paragraph>
      </div>
      <Avatar />
    </div>
  );
};

export default ProfileBox;
