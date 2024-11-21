import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Button from "../../../../components/buttons/Button";
import TextArea from "../../../../components/inputs/TextArea";

const TicketActions = () => {
  return (
    <div className=" flex gap-6 items-center justify-between border-t border-secondary-200 p-4">
      <TextArea className="!min-h-[60px]" />
      <Button
        Icon={PaperAirplaneIcon}
        className="w-[130px] flex-row-reverse [&>svg]:rotate-180"
      >
        ارسال پیام
      </Button>
    </div>
  );
};

export default TicketActions;
