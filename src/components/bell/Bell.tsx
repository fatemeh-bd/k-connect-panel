import { BellAlertIcon } from "@heroicons/react/24/outline";

const Bell = () => {
  return (
    <div className="relative">
      <BellAlertIcon className="size-9 bg-zinc-100 dark:bg-zinc-800 rounded-full p-2" />
      <span className="absolute top-5 -right-2 min-w-5 min-h-5 rounded-full text-xs flex items-center justify-center p-1 pb-0.5 bg-primary dark:bg-zinc-700 text-primary dark:text-zinc-300 font-medium bg-opacity-15">
        10
      </span>
    </div>
  );
};

export default Bell;
