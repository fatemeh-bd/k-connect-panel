import { useParams, useSearchParams } from "react-router-dom";
import { boxStyle } from "../../utils/enums";
import TicketContent from "./_components/ticketDetailComponents/TicketContent";
import TicketHeader from "./_components/ticketDetailComponents/TicketHeader";
import { notify } from "../../utils/notify";
import { postMethod } from "../../api/callApi";
import { useQuery } from "react-query";
import { TICKET_DETAILS } from "../../api/endpoints";
import CustomSkeleton from "../../components/skeleton/skeleton";

const TicketDetail = () => {
  const { id } = useParams(); // مقدار id از URL
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

  const { data = {}, isLoading } = useQuery(`ticket-${id}`, async () => {
    return await fetchData();
  });

  return !isLoading ? (
    <div className={`${boxStyle} !p-0`}>
      <TicketHeader
        title={data.ticketTitle}
        ticketSectionName={data.ticketSectionName}
      />
      <TicketContent messages={data.messages} />
    </div>
  ) : (
    <div>
      <CustomSkeleton height="h-[90px]" />
      <CustomSkeleton height="h-[400px]" className="mt-3" />
    </div>
  );
};

export default TicketDetail;
