import { useQuery } from "react-query";
import { postMethod } from "../../../../api/callApi";
import { GET_PROFILE } from "../../../../api/endpoints";
import { notify } from "../../../../utils/notify";
import { boxStyle } from "../../../../utils/enums";
import CustomSkeleton from "../../../../components/skeleton/skeleton";
import Paragraph from "../../../../components/typography/Paragraph";

const UserProfile = () => {
  const fetchProfile = async () => {
    const response = await postMethod(GET_PROFILE, {});
    if (response?.isSuccess) {
      return response.data;
    } else {
      notify(response.message, "error");
      return {};
    }
  };

  const { data = {}, isLoading } = useQuery("َAccountProfile", async () => {
    return await fetchProfile();
  });

  if (isLoading) {
    return (
      <div className={`${boxStyle} grid grid-cols-12 gap-6 p-6`}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="md:col-span-4 col-span-12 flex  gap-2">
            <CustomSkeleton width="w-24" height="h-4" />
            <CustomSkeleton width="w-32" height="h-4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${boxStyle} grid grid-cols-12 gap-4`}>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap"> نام و نام خانوادگی :</label>
        <Paragraph>{data?.firstName + " " + data?.lastName}</Paragraph>
      </div>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap"> تماس :</label>
        <Paragraph>{data?.phoneNumber}</Paragraph>
      </div>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap"> ایمیل :</label>
        <Paragraph>{data?.sellerInfo?.userName}</Paragraph>
      </div>
      <div className="md:col-span-4 col-span-12 flex gap-4 items-center">
        <label className="text-nowrap"> مدت زمان فعالیت شما :</label>
        <Paragraph>{data?.sellerInfo.registerDate}</Paragraph>
      </div>
    </div>
  );
};

export default UserProfile;
