import MessageBox from "./MessageBox";
import TicketActions from "./TicketActions";

interface TicketMessagesProps {
  message: string;
  operationSend: number; // محدود کردن نوع به مقادیر مشخص
  timeAgo: string; // محدود کردن نوع به مقادیر مشخص
}

interface TicketHeaderProps {
  messages: TicketMessagesProps[];
}

const TicketContent: React.FC<TicketHeaderProps> = ({ messages }) => {
  return (
    <div className="pt-6 flex flex-col justify-between chat">
      {/* Messages */}
      <div className="h-full overflow-auto px-8">
        {messages ? (
          messages.map((message, index) => (
            <MessageBox
              key={index}
              type={message.operationSend == 0 ? "operator" : "client"}
              messageText={message.message || "پیام خالی"}
              time={message.timeAgo}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            پیامی برای نمایش وجود ندارد.
          </p>
        )}
      </div>

      {/* Ticket Actions */}
      <TicketActions />
    </div>
  );
};

export default TicketContent;
