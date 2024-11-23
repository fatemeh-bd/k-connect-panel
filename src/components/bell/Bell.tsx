import {
  BellAlertIcon,
  BellIcon,
  ChevronDoubleLeftIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Paragraph from "../typography/Paragraph";
import { ColorType, Sizes } from "../../utils/enums";
import Title from "../typography/Title";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Bell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifs.current &&
        !notifs.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative">
      <div className="relative " onClick={() => setIsOpen((prev) => !prev)}>
        <BellAlertIcon className="size-9 cursor-pointer bg-secondary-100  text-secondary-600 rounded-full p-2" />
        <span className="absolute font-semibold animate-bounce top-5 -right-2 min-w-5 min-h-5 rounded-full text-xs flex items-center justify-center p-1 pb-0.5 bg-secondary-200  text-primary  bg-opacity-15">
          10
        </span>
      </div>
      {isOpen && (
        <div ref={notifs} className="absolute top-full mt-2 text-sm left-0 z-50 bg-white border border-secondary-200 shadow-lg rounded-lg lg:w-96 w-fit">
          <div className="bg-primary text-center text-white p-4 rounded-t-lg">
            <div className="flex text-secondary-200 gap-2 items-center justify-center">
            <BellIcon className="size-7" />
            <Title className="!mb-0 text-secondary-100 dark:text-secondary-200 "> ۵ اعلان جدید</Title>
            </div>
            <Paragraph size={Sizes.sm} className="mt-2 text-secondary-500">
              اعلانات پنل در این قسمت نمایش داده میشود
            </Paragraph>
          </div>

          <ul className="max-h-[300px] overflow-auto">
            {[
              "نوتیف داریییییییییی",
              "سرور جدید اضافه شده یعنی نمیخوای بگیری؟",
            ].map((i) => (
              <li
                key={i}
                className="p-4 hover:cursor-pointer border-b border-secondary-200 flex justify-between gap-2"
              >
                <div className="flex items-start gap-2 hover:!text-purple hover:font-semiBold">
                  <InformationCircleIcon className="size-4" />
                  <Paragraph size={Sizes.sm}>{i}</Paragraph>
                </div>
                <span className="text-xs text-secondary-500 text-nowrap">
                  12ساعت پیش
                </span>
              </li>
            ))}
            <Link to="/MyNotification" className="p-3 hover:bg-secondary-200 bg-secondary-100 flex justify-between gap-2">
              <Paragraph type={ColorType.SECONDARY} className="flex gap-2 items-center justify-center text-center mx-auto">
                مشاهده همه
                <ChevronDoubleLeftIcon className="size-4" />
              </Paragraph>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Bell;
