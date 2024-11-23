import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Button from "../../../../components/buttons/Button";
import TextArea from "../../../../components/inputs/TextArea";
interface TicketActionsProps {
ticketId:string // محدود کردن نوع به مقادیر مشخص
}
const TicketActions = () => {
  return (
    <div className="md:relative fixed bg-white bottom-0 w-full flex md:gap-6 gap-4 items-center justify-between border-t border-secondary-200 p-4">
      <TextArea className="!min-h-[60px] w-full" />
      <Button
        Icon={PaperAirplaneIcon}
        className="md:min-w-[130px] min-w-[55px] md:px-4 px-1 flex-row-reverse [&>svg]:rotate-180"
      >
        <span className="md:inline hidden">ارسال پیام</span>
      </Button>
    </div>
  );
};

export default TicketActions;
