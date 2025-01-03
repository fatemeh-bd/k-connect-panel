import Avatar from "./Avatar";
import Paragraph from "../typography/Paragraph";
import { ColorType, Sizes } from "../../utils/enums";
import { useQueries } from "react-query";
import { postMethod } from "../../api/callApi";
import { GET_BALANCE, GET_PROFILE } from "../../api/endpoints";
import { notify } from "../../utils/notify";
import { numberWithCommas } from "../../utils/helper";
import { ProfileInfoType, useProfile } from "../../store/profileSlice";
import { useLang } from "../../context/LangProvider";

const fetchBalance = async () => {

  
  const response = await postMethod(GET_BALANCE, {});
  if (response?.isSuccess) {
    return response.data;
  } else {
    notify(response.message, "error");
    return [];
  }
};

const fetchProfile = async (
  setProfileInfo: (profile: ProfileInfoType) => void
) => {
  const response = await postMethod(GET_PROFILE, {});
  if (response?.isSuccess) {
    setProfileInfo(response.data);
    return response.data;
  } else {
    notify(response.message, "error");
    return [];
  }
};

const ProfileBox = () => {
  const { info, setProfileInfo } = useProfile();
  const { t } = useLang();
  const results = useQueries([
    {
      queryKey: "profile",
      queryFn: () => fetchProfile(setProfileInfo),
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
    {
      queryKey: "balance",
      queryFn: fetchBalance,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
  ]);

  const { data: balance } = results[1];

  return (
    <div className="flex items-center justify-start gap-2">
      <div className="">
        <Paragraph size={Sizes.sm} className="font-medium">
          {info?.sellerInfo?.userName}
        </Paragraph>
        <div>
          <Paragraph size={Sizes.xs} type={ColorType.PRIMARY}>
           {t("userBalance")} :
            {balance && <span>{numberWithCommas(balance)} تومان</span>}
          </Paragraph>
        </div>
      </div>
      <Avatar />
    </div>
  );
};

export default ProfileBox;
