import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Accordion = ({ data }: { data: { title: string; msg: string } }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mx-auto bg-white rounded-lg border border-gray-200">
            <button
                onClick={toggleAccordion}
                className="flex justify-between items-center w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100"
            >
                <span className="text-lg font-medium text-gray-800">{data.title}</span>
                <ChevronDownIcon
                    className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            <div
                id="accordion-content"
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-[400px]" : "max-h-0"
                    }`}
            >
                <div className="px-6 py-4 text-gray-700">
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
