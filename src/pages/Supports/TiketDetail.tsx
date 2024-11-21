import { boxStyle } from "../../utils/enums";
import TicketContent from "./_components/ticketDetailComponents/TicketContent";
import TicketHeader from "./_components/ticketDetailComponents/TicketHeader";

const TicketDetail = () => {
  return (
    <div className={`${boxStyle} !p-0`}>
      <TicketHeader />
      <TicketContent />
    </div>
  );
};

export default TicketDetail;
