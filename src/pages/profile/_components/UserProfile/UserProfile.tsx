import { boxStyle } from "../../../../utils/enums";
import Paragraph from "../../../../components/typography/Paragraph";
import { useProfile } from "../../../../store/profileSlice";

const UserProfile = () => {
  const { info } = useProfile();

  return (
    <div className={`${boxStyle} grid grid-cols-12 gap-4`}>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap"> نام و نام خانوادگی :</label>
        <Paragraph>{info?.firstName + " " + info?.lastName}</Paragraph>
      </div>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap"> تماس :</label>
        <Paragraph>{info?.phoneNumber}</Paragraph>
      </div>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap"> ایمیل :</label>
        <Paragraph>{info?.sellerInfo?.userName}</Paragraph>
      </div>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap"> مدت زمان فعالیت شما :</label>
        <Paragraph>{info?.sellerInfo.registerDate}</Paragraph>
      </div>
    </div>
  );
};

export default UserProfile;
