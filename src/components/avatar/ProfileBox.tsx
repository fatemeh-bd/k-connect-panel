import Avatar from "./Avatar";
import Paragraph from "../typography/Paragraph";
import { ColorType, Sizes } from "../../utils/enums";
import { useQueries } from "react-query";
import { postMethod } from "../../api/callApi";
import { GET_BALANCE, GET_PROFILE } from "../../api/endpoints";
import { notify } from "../../utils/notify";
import { numberWithCommas } from "../../utils/helper";

const fetchBalance = async () => {
  const response = await postMethod(GET_BALANCE, {});
  if (response?.isSuccess) {
    return response.data;
  } else {
    notify(response.message, "error");
    return [];
  }
};
const fetchProfile = async () => {
  const response = await postMethod(GET_PROFILE, {});
  if (response?.isSuccess) {
    return response.data;
  } else {
    notify(response.message, "error");
    return [];
  }
};
const ProfileBox = () => {
  const results = useQueries([
    {
      queryKey: "profile",
      queryFn: fetchProfile,
    },
    {
      queryKey: "balance",
      queryFn: fetchBalance,
    },
  ]);

  const { data: profile } = results[0];
  const { data: balance } = results[1];

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="text-left">
        <Paragraph size={Sizes.sm} className="font-medium">
          {profile && profile.userName}
        </Paragraph>
        <Paragraph>
          <Paragraph size={Sizes.xs} type={ColorType.PRIMARY}>
            موجودی شما:
            {balance && <span>{numberWithCommas(balance)} تومان</span>}
          </Paragraph>
        </Paragraph>
      </div>
      <Avatar />
    </div>
  );
};

export default ProfileBox;
