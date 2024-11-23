import { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import CustomSkeleton from "../../../../components/skeleton/skeleton";

interface TicketMessagesProps {
  message: string;
  operationSend: number; // محدود کردن نوع به مقادیر مشخص
  timeAgo: string; // محدود کردن نوع به مقادیر مشخص
}

interface TicketHeaderProps {
  messages: TicketMessagesProps[];
  loading: boolean;
}

const TicketContent: React.FC<TicketHeaderProps> = ({ messages, loading }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages,loading]);

  return (
    <div className="h-full overflow-auto px-8">
      {messages && messages.length > 0 ? (
        [...messages]
          .reverse()
          .map((message, index) => (
            <MessageBox
              key={index}
              type={message.operationSend === 1 ? "operator" : "client"}
              messageText={message.message || "پیام خالی"}
              time={message.timeAgo}
            />
          ))
      ) : (
        <p className="text-gray-500 text-center py-4">
          پیامی برای نمایش وجود ندارد.
        </p>
      )}
      {loading && (
        <div className="flex gap-2 mb-4">
          <CustomSkeleton height="!size-[40px] rounded-full" />
          <CustomSkeleton height="h-[60px]" />
        </div>
      )}
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default TicketContent;
