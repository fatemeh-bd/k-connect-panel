import { useQuery } from "react-query";
import { postMethod } from "../../../api/callApi";
import { DASHBOARD } from "../../../api/endpoints";
import { notify } from "../../../utils/notify";
import InfoBox from "./InfoBox";
import {
  CheckBadgeIcon,
  ServerIcon,
  UserMinusIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { numberWithCommas } from "../../../utils/helper";
import CustomSkeleton from "../../../components/skeleton/skeleton";

const InfoList = () => {
  const fetchData = async () => {
    const response = await postMethod(DASHBOARD, {});
    if (response?.isSuccess) {
      return response.data;
    } else {
      notify(response.message, "error");
      return {};
    }
  };

  const { data: dashdata = {}, isLoading } = useQuery(
    "dashboard",
    async () => {
      return await fetchData();
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

 
  return !isLoading ? (
    <div className="grid grid-cols-12 md:gap-4 gap-2">
      <div className="lg:col-span-3 col-span-6 ">
        <InfoBox
          data={{
            title: "تعداد کاربران فعال شما",
            icon: CheckBadgeIcon,
            value: dashdata?.activeClientCount,
            color: "#666cff",
          }}
        />
      </div>
      <div className="lg:col-span-3 col-span-6 ">
        <InfoBox
          data={{
            title: "تعداد کاربران غیرفعال شما",
            icon: UserMinusIcon,
            value: dashdata?.deActiveClientCount,
            color: "#666cff",
          }}
        />
      </div>
      <div className="lg:col-span-3 col-span-6 ">
        <InfoBox
          data={{
            title: "کیف پول",
            icon: WalletIcon,
            value: `${numberWithCommas(Number(dashdata.balance))} تومان`,
            color: "#666cff",
          }}
        />
      </div>
      <div className="lg:col-span-3 col-span-6 ">
        <InfoBox
          data={{
            title: "تعداد سرور ها",
            icon: ServerIcon,
            value: dashdata?.serverCount,
            color: "#666cff",
          }}
        />
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-12 md:gap-4 gap-2">
      <div className="lg:col-span-3 col-span-6 ">
        <CustomSkeleton width="w-full" height="h-[200px]" />
      </div>
      <div className="lg:col-span-3 col-span-6 ">
        <CustomSkeleton width="w-full" height="h-[200px]" />
      </div>
      <div className="lg:col-span-3 col-span-6 ">
        <CustomSkeleton width="w-full" height="h-[200px]" />
      </div>
      <div className="lg:col-span-3 col-span-6 ">
        <CustomSkeleton width="w-full" height="h-[200px]" />
      </div>
    </div>
  );
};

export default InfoList;
