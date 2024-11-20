import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Paragraph from "../typography/Paragraph";

const Accordion = ({ data }: { data: { title: string; msg: string } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
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
          {typeof data.msg === "string" ? (
            <div dangerouslySetInnerHTML={{ __html: data.msg }} />
          ) : (
            <div>{data.msg}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
