import Avatar from "../../../../components/avatar/Avatar";
import Paragraph from "../../../../components/typography/Paragraph";

const MessageBox = ({
  type,
  messageText,
  time,
}: {
  type?: "client" | "operator";
  messageText: string;
  time: string;
}) => {
  return (
    <div
      className={`${
        type === "client" ? "ml-auto" : "mr-auto flex-row-reverse"
      } lg:max-w-[50%] max-w-[80%] w-fit flex gap-4 items-start my-2`}
    >
      <Avatar className="border border-primary" />
      <div>
        <Paragraph
          className={`bg-primary text-white dark:bg-secondary-800 py-2.5 px-6 rounded-md ${
            type == "client" ? "bg-primary" : "bg-purple-600"
          }`}
        >
          {messageText}
        </Paragraph>
        <span className="block w-fit  text-sm text-secondary-500 mt-1">
          {time}
        </span>
      </div>
    </div>
  );
};

export default MessageBox;
