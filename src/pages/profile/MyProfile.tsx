import {
  LockClosedIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Tabs from "../../components/tabs/Tabs";
import { TabType } from "../../components/tabs/TabsTypes";
import UserProfile from "./_components/UserProfile/UserProfile";
import EditProfile from "./_components/EditProfile/EditProfile";
import ChangePassword from "./_components/ChangePassword/ChangePassword";

const MyProfile = () => {
  const tabs: TabType[] = [
    { icon: UserIcon, label: "پروفایل من", id: 1 },
    { icon: PencilSquareIcon, label: "جزئیات حساب", id: 2 },
    { icon: LockClosedIcon, label: "تغییر کلمه عبور", id: 3 },
  ];
  const content = [<UserProfile />, <EditProfile />, <ChangePassword />];
  return (
    <div>
      <Tabs tabs={tabs} componets={content}></Tabs>
    </div>
  );
};

export default MyProfile;
