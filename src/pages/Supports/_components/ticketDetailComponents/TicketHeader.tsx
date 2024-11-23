import { useParams } from "react-router-dom";
import { postMethod } from "../../../../api/callApi";
import { CLOSE_TICKET } from "../../../../api/endpoints";
import Avatar from "../../../../components/avatar/Avatar";
import Button from "../../../../components/buttons/Button";
import Paragraph from "../../../../components/typography/Paragraph";
import { ColorType } from "../../../../utils/enums";
import { useMutation } from "react-query";
import { notify } from "../../../../utils/notify";

interface TicketHeaderProps {
  data: {
    ticketTitle?: string;
    ticketSectionName?: string;
    state: 0 | 1 | 2 | 3;
  };
  refetch: () => void;
}

const TicketHeader: React.FC<TicketHeaderProps> = ({ data, refetch }) => {
  const { id } = useParams();
  const { mutate, isLoading } = useMutation(async () => {
    await postMethod(CLOSE_TICKET + "?ticketId=" + id, {}).then((res) => {
      if (res?.isSuccess) {
        refetch();
        return res.data;
      } else {
        notify(res?.message, "error");
      }
    });
  });
  const closeTicketHandler = () => {
    mutate();
  };
  return (
    <div className="flex items-center gap-6 flex-wrap justify-between bg-secondary-100 shadow-xl dark:shadow-black p-4 rounded-md">
      <div className="flex gap-2 items-center">
        <Avatar />
        <div className="flex gap-5">
          <Paragraph className="font-bold">
            عنوان:
            {data.ticketTitle}
          </Paragraph>
          <Paragraph className="font-bold" type={ColorType.SUCCESS}>
            وضعیت:
            {data.ticketSectionName}
          </Paragraph>
        </div>
      </div>
      {data.state !== 3 && data.state < 3 && data.state > 0 && (
        <Button loading={isLoading} onClick={closeTicketHandler}>
          بستن تیکت
        </Button>
      )}
    </div>
  );
};

export default TicketHeader;
