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
import { useLang } from "../../context/LangProvider";
import { translations } from "../../context/translations";

const MyProfile = () => {

  const {lang}=useLang();
  const tabs: TabType[] = [
    { icon: UserIcon, label: translations[lang].AccountTitle, id: 1 },
    { icon: PencilSquareIcon, label:translations[lang].accountDetails, id: 2 },
    { icon: LockClosedIcon, label:translations[lang].changePassword, id: 3 },
  ];
  const content = [<UserProfile />, <EditProfile />, <ChangePassword />];
  return (
    <div>
      <Tabs tabs={tabs} components={content}></Tabs>
    </div>
  );
};

export default MyProfile;
