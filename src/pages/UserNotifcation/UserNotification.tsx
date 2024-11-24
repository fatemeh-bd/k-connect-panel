import { useQuery } from "react-query";
import { getMethod, postMethod } from "../../api/callApi";
import Accordion from "../../components/Accordion/Accordion";
import { notify } from "../../utils/notify";
import { GET_NOTIF, READ_NOTIF } from "../../api/endpoints";
import CustomSkeleton from "../../components/skeleton/skeleton";
import MyNotification from "./_commponets/MyNotifications";
const UserNotification = () => {
  const fetchNotif = async () => {
    const response = await getMethod(GET_NOTIF);
    if (response?.isSuccess) {
      return response.data;
    } else {
      notify(response.message, "error");
      return {};
    }
  };
  const readNotif = async (notificationId: string) => {
    const response = await postMethod(READ_NOTIF, { notificationId });
    if (response?.isSuccess) {
      return response.data;
    } else {
      notify(response.message, "error");
      return {};
    }
  };

 
  const { data = {}, isLoading } = useQuery("َAccountNotif", async () => {
    return await fetchNotif();
  });

  return (
    <div>
      <h2 className="mb-4"> اعلانی های دریافتی</h2>
      {!isLoading ? (
        <div className="space-y-2">
          {data.map((item, index) => (
            <MyNotification
              key={index} 
              data={item}
              onClick={readNotif(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 mb-4">
          <CustomSkeleton width="w-full" height="h-[60px]" />
          <CustomSkeleton width="w-full" height="h-[60px]" />
          <CustomSkeleton width="w-full" height="h-[60px]" />
          <CustomSkeleton width="w-full" height="h-[60px]" />
          <CustomSkeleton width="w-full" height="h-[60px]" />
          <CustomSkeleton width="w-full" height="h-[60px]" />
          <CustomSkeleton width="w-full" height="h-[60px]" />
        </div>
      )}
    </div>
  );
};

export default UserNotification;
