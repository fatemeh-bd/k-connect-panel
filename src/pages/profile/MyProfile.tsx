import { UserIcon } from "@heroicons/react/24/outline";
import Tabs from "../../components/tabs/Tabs";
import { TabType } from "../../components/tabs/TabsTypes";
import UserProfile from "./_components/UserProfile/UserProfile";
import EditProfile from "./_components/EditProfile/EditProfile";

const MyProfile = () => {

    const tabs: TabType[] = [
        { icon: UserIcon, label: "پروفایل من", id: 1 },
        { icon: UserIcon, label: "جزئیات حساب", id: 2 },
        { icon: UserIcon, label: "تغییر کلمه عبور", id: 3 }

    ]
    const content = [
        <UserProfile />,
        <EditProfile />,
        <p>Profile Detial</p>,

    ]
    return (

        <div >
            <Tabs tabs={tabs} componets={content}></Tabs>

        </div>

    );
}

export default MyProfile;