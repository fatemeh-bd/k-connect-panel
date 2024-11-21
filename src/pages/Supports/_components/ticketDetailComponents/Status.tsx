import Paragraph from "../../../../components/typography/Paragraph";
import { ColorType } from "../../../../utils/enums";

const Status = ({ text }: { text?: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="relative flex size-3 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
        <span className="relative inline-flex items-center justify-center rounded-full bg-teal-500 size-2 text-white font-bold text-xs"></span>
      </span>
      <Paragraph type={ColorType.SUCCESS}>{text}</Paragraph>
    </div>
  );
};

export default Status;
