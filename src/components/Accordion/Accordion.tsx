import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Paragraph from "../typography/Paragraph";

const Accordion = ({ data }: { data: { title: string; msg: string } }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mx-auto bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
                onClick={toggleAccordion}
                className={`flex justify-between items-center w-full px-6 py-4 text-left   hover:bg-gray-100 ${isOpen ? "dark:bg-gray-800 bg-gray-100" : "dark:bg-gray-900 light:bg-gray-50"} dark:hover:bg-gray-800`}
            >
                <Paragraph className="font-medium">{data.title}</Paragraph>
                <ChevronDownIcon
                    className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            <div
                id="accordion-content"
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-[400px] " : "max-h-0"
                    }`}
            >
                <div className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {/* If msg contains HTML, use dangerouslySetInnerHTML */}
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
