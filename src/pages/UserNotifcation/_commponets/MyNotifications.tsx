import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Paragraph from "../../../components/typography/Paragraph";

const MyNotification = ({
  data,
  onClick,
}: {
  data: {
    title: string;
    detailes: string;
    readOut: boolean;
  };
  onClick?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen && onClick) {
      onClick();
    }
  };

  return (
    <div className="mx-auto bg-white rounded-lg border border-secondary-200  overflow-hidden">
      <button
        onClick={toggleAccordion}
        className={`flex justify-between items-center w-full px-6 py-4 text-left bg-secondary-100`}
      >
        <Paragraph className="font-medium">{data.title}</Paragraph>
        <ChevronDownIcon
          className={`h-5 w-5 text-secondary-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id="accordion-content"
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] " : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 text-secondary-500">
          {typeof data.detailes === "string" ? (
            <div dangerouslySetInnerHTML={{ __html: data.detailes }} />
          ) : (
            <div>{data.detailes}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyNotification;
