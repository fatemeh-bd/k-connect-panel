import InfoBox from "./InfoBox";
import {
  ServerIcon,
  UserGroupIcon,
  UsersIcon,
  WalletIcon,
  
} from "@heroicons/react/24/outline";

const infoList = [
  {
    title: "تعداد کاربران شما",
    icon: UserGroupIcon,
    value: "12 نفر",
    color: "#666cff",
  },
  {
    title: "کیف پول شما",
    icon: WalletIcon,
    value: "12,000 تومان",
    color: "#fdb528",
  },
  {
    title: "کاربران فعال",
    icon: UsersIcon,
    value: "12 نفر",
    color: "#ff0c0b",
  },
  {
    title: "سرورها",
    icon: ServerIcon,
    value: "3",
    color: "#0fbff5",
  },
];
const InfoList = () => {
  return (
    <div className="grid grid-cols-12 md:gap-4 gap-2">
      {infoList.map((item) => (
        <div
          className="lg:col-span-3 col-span-6 "
          key={item.title}
        >
          <InfoBox data={item} />
        </div>
      ))}
    </div>
  );
};

export default InfoList;
