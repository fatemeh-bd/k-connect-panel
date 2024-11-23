import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Button from "../../../../components/buttons/Button";
import TextArea from "../../../../components/inputs/TextArea";
import { useMutation } from "react-query";
import { useState } from "react";
import { postMethod } from "../../../../api/callApi";
import { SEND_MESSAGE } from "../../../../api/endpoints";
import { useParams } from "react-router-dom";
import { notify } from "../../../../utils/notify";

const TicketActions = ({ refetch }: { refetch: () => void }) => {
  const { id } = useParams();

  const [msg, setMsg] = useState<string>("");
  const { mutate, isLoading } = useMutation(async () => {
    if (id) {
      const formData = new FormData();
      formData.append("TicketId", id);
      formData.append("Message", msg);
      const res = await postMethod(SEND_MESSAGE, formData);
      if (res?.isSuccess) {
        refetch();
        setMsg("");
        return res.data;
      } else {
        notify(res?.message, "error");
      }
    } else {
      notify("تیکت یافت نشد", "error");
    }
  });

  const sendMessageHandler = () => {
    mutate();
  };
  return (
    <div className="lg:relative fixed bg-white right-0 left-0 top-auto bottom-0 w-full flex lg:gap-6 gap-4 items-center justify-between border-t border-secondary-200 p-4">
      <TextArea
        className="[&>textarea]:!min-h-[60px] w-full"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <Button
        Icon={PaperAirplaneIcon}
        className="lg:min-w-[130px] min-w-[55px] lg:px-4 px-1 flex-row-reverse [&>svg]:rotate-180"
        onClick={sendMessageHandler}
        loading={isLoading}
      >
        <span className="lg:inline hidden">ارسال پیام</span>
      </Button>
    </div>
  );
};

export default TicketActions;
