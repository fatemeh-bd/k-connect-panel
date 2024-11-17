import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { boxStyle } from "../../../utils/enums";
import Paragraph from "../../../components/typography/Paragraph";
import { Link } from "react-router-dom";

const LastNotifications = () => {
  return (
    <div className={boxStyle}>
      <Paragraph className="mb-4">آخرین اخبار</Paragraph>
      <div className="space-y-2">
        <div
          className="bg-zinc-100 border-r-4 border-zinc-500 rounded-b text-zinc-900 px-4 py-3 shadow-md flex items-center justify-between flex-wrap gap-2"
          role="alert"
        >
          <div className="flex gap-3">
            <InformationCircleIcon className="size-6" />

            <p className="font-medium">اضافه شدن سرور های جدید </p>
          </div>
          <Link
            className="bg-zinc-300 mr-auto py-1 px-3 rounded-full hover:bg-primary hover:text-white"
            to="/"
          >
            مشاهده بیشتر
          </Link>
        </div>
        <div
          className="bg-zinc-100 border-r-4 border-zinc-500 rounded-b text-zinc-900 px-4 py-3 shadow-md flex items-center justify-between flex-wrap gap-2"
          role="alert"
        >
          <div className="flex gap-3">
            <InformationCircleIcon className="size-6" />

            <p className="font-medium">اضافه شدن سرور های جدید </p>
          </div>
          <Link
            className="bg-zinc-300 mr-auto py-1 px-3 rounded-full hover:bg-primary hover:text-white"
            to="/"
          >
            مشاهده بیشتر
          </Link>
        </div>
        <div
          className="bg-zinc-100 border-r-4 border-zinc-500 rounded-b text-zinc-900 px-4 py-3 shadow-md flex items-center justify-between flex-wrap gap-2"
          role="alert"
        >
          <div className="flex gap-3">
            <InformationCircleIcon className="size-6" />

            <p className="font-medium">اضافه شدن سرور های جدید </p>
          </div>
          <Link
            className="bg-zinc-300 mr-auto py-1 px-3 rounded-full hover:bg-primary hover:text-white"
            to="/"
          >
            مشاهده بیشتر
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LastNotifications;
