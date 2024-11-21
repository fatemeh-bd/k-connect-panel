import MessageBox from "./MessageBox";
import TicketActions from "./TicketActions";

const TicketContent = () => {
  return (
    <div className="pt-6 flex flex-col justify-between  h-[79vh]">
      <div className="h-full overflow-auto px-8">
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />

        <MessageBox type="client" />
        <MessageBox type="client" />
        <MessageBox />
      </div>
      <TicketActions />
    </div>
  );
};

export default TicketContent;
