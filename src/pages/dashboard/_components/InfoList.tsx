import InfoBox from "./InfoBox";
import {
  ServerIcon,
  UserGroupIcon,
  UsersIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";

const fetchData=()=>{

  
}
const InfoList = () => {
  return (
    <div className="grid grid-cols-12 md:gap-4 gap-2">
      <div className="lg:col-span-3 col-span-6 ">
        <InfoBox
          data={{
            title: "تعداد کاربران شما",
            icon: UserGroupIcon,
            value: "12 نفر",
            color: "#666cff",
          }}
        />
      </div>
    </div>
  );
};

export default InfoList;
