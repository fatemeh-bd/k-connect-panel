import { FC, useState } from "react";
import { TabsProps } from "./TabsTypes";

const Tabs: FC<TabsProps> = ({ tabs, componets }) => {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div>

      <div className="my-4 relative overflow-x-auto">
        <ul className="inline-flex sm:gap-2 bg-secondary-200 border border-border border-secondary-500 md:text-base text-xs rounded-md p-1">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`${selectedTab == tab.id
                ? "bg-primary text-white  rounded-md"
                : "text-secondary-700"
                }  flex text-nowrap items-center gap-1 py-2 px-3 cursor-pointer sm:text-sm text-xs`}
              onClick={() => setSelectedTab(tab.id)}
            >
              <tab.icon className="md:size-5 size-4" />
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
      {componets[selectedTab - 1]}
    </div>
  );
};

export default Tabs;
