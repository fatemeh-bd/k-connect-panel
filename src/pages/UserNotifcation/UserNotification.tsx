import { useQuery } from "react-query";
import { getMethod, postMethod } from "../../api/callApi";
import { notify } from "../../utils/notify";
import { GET_NOTIF, READ_NOTIF } from "../../api/endpoints";
import CustomSkeleton from "../../components/skeleton/skeleton";
import MyNotification from "./_commponets/MyNotifications";
import { useLang } from "../../context/LangProvider";
import { translations } from "../../context/translations";
const UserNotification = () => {
  const { lang } = useLang();

  const fetchNotif = async () => {
    const response: any = await getMethod(GET_NOTIF);
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

  const { data = {}, isLoading } = useQuery(
    "َAccountNotif",
    async () => {
      return await fetchNotif();
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  return (
    <div>
      <h2 className="mb-4">{translations[lang].receivedNotifications}</h2>
      {!isLoading ? (
        <div className="space-y-2">
          {data.map((item: any, index: any) => (
            <MyNotification
              key={index}
              data={item}
              onClick={() => readNotif(item.id)}
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
