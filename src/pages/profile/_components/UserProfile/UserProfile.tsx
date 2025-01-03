import { boxStyle } from "../../../../utils/enums";
import Paragraph from "../../../../components/typography/Paragraph";
import { useProfile } from "../../../../store/profileSlice";
import { useLang } from "../../../../context/LangProvider";

const UserProfile = () => {

const {getTranslation}=useLang();

  const { info } = useProfile();
  return (
    <div className={`${boxStyle} grid grid-cols-12 gap-4`}>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap"> {getTranslation("fullName")}:</label>
        <Paragraph>{info?.firstName + " " + info?.lastName}</Paragraph>
      </div>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap"> {getTranslation("contactNumber")} :</label>
        <Paragraph>{info?.phoneNumber}</Paragraph>
      </div>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap"> {getTranslation("email")} :</label>
        <Paragraph>{info?.sellerInfo?.userName}</Paragraph>
      </div>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap">{getTranslation("activityDuration")}:</label>
        <Paragraph>{info?.sellerInfo.registerDate}</Paragraph>
      </div>
    </div>
  );
};

export default UserProfile;
