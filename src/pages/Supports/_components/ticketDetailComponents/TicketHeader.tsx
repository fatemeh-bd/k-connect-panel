import Avatar from "../../../../components/avatar/Avatar";
import Button from "../../../../components/buttons/Button";
import Paragraph from "../../../../components/typography/Paragraph";

const TicketHeader = () => {
  return (
    <div className="flex items-center gap-6 justify-between bg-secondary-100 shadow-xl dark:shadow-black p-4 rounded-md">
      <div className="flex gap-2 items-center">
        <Avatar />
        <div>
          <Paragraph className="font-bold">عنوان:تغییر سرور</Paragraph>
        </div>
      </div>

      <Button>بستن تیکت</Button>
    </div>
  );
};

export default TicketHeader;
