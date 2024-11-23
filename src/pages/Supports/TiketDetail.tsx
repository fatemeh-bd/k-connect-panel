import { useParams } from "react-router-dom";
import { boxStyle } from "../../utils/enums";
import TicketContent from "./_components/ticketDetailComponents/TicketContent";
import TicketHeader from "./_components/ticketDetailComponents/TicketHeader";
import { notify } from "../../utils/notify";
import { postMethod } from "../../api/callApi";
import { useQuery } from "react-query";
import { TICKET_DETAILS } from "../../api/endpoints";
import CustomSkeleton from "../../components/skeleton/skeleton";
import TicketActions from "./_components/ticketDetailComponents/TicketActions";

const TicketDetail = () => {
  const { id } = useParams();
  console.log(
    "%csrcpagesSupportsTiketDetail.tsx:12 object",
    "color: #007acc;",
    id
  );
  const fetchData = async () => {
    const response = await postMethod(TICKET_DETAILS + `?ticketId=${id}`, {});
    if (response?.isSuccess) {
      return response.data;
    } else {
      notify(response.message, "error");
      return {};
    }
  };

  const {
    data = {},
    isLoading,
    isFetching,
    refetch,
  } = useQuery(
    `ticket-${id}`,
    async () => {
      return await fetchData();
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  return !isLoading ? (
    <div className={`${boxStyle} !p-0`}>
      <TicketHeader data={data} refetch={refetch} />
      <div className="pt-6 flex flex-col justify-between chat">
        <TicketContent messages={data.messages} loading={isFetching} />

        <TicketActions refetch={refetch} />
      </div>
    </div>
  ) : (
    <div>
      <CustomSkeleton height="h-[90px]" />
      <CustomSkeleton height="h-[400px]" className="mt-3" />
    </div>
  );
};

export default TicketDetail;
