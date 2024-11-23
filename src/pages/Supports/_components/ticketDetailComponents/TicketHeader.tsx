import Avatar from "../../../../components/avatar/Avatar";
import Button from "../../../../components/buttons/Button";
import Paragraph from "../../../../components/typography/Paragraph";
import { ColorType } from "../../../../utils/enums";

interface TicketHeaderProps {
  title?: string;
  ticketSectionName?: string;
}

const TicketHeader: React.FC<TicketHeaderProps> = ({
  title,
  ticketSectionName,
}) => {
  return (
    <div className="flex items-center gap-6 justify-between bg-secondary-100 shadow-xl dark:shadow-black p-4 rounded-md">
      <div className="flex gap-2 items-center">
        <Avatar />
        <div className="flex gap-5">
          <Paragraph className="font-bold">
            عنوان:
            {title}
          </Paragraph>
          <Paragraph className="font-bold" type={ColorType.SUCCESS}>
            وضعیت:
            {ticketSectionName}
          </Paragraph>
        </div>
      </div>

      <Button>بستن تیکت</Button>
    </div>
  );
};

export default TicketHeader;
