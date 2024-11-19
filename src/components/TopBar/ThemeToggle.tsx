import { useState } from "react";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleThemeChange = (selectedTheme: "light" | "dark" | "system") => {
    setTheme(selectedTheme);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="size-9 bg-gray-100 dark:bg-gray-800 rounded-full  flex items-center justify-center"
      >
        {theme === "dark" ? (
          <SunIcon className="dark:text-yellow-500 size-6" />
        ) : theme === "system" ? (
          <ComputerDesktopIcon className="size-6" />
        ) : (
          <MoonIcon className="dark:text-blue-500 size-6" />
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full  mt-2 text-sm left-0 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg w-48">
          <ul className="flex flex-col">
            <li
              onClick={() => handleThemeChange("light")}
              className={`py-2 px-4 flex gap-2 items-center cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === "light" ? "bg-gray-200" : ""
                }`}
            >
              <SunIcon className="size-5" />
              تم روشن
            </li>
            <li
              onClick={() => handleThemeChange("dark")}
              className={`py-2 px-4 flex gap-2 items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === "dark" ? " dark:bg-gray-600" : ""
                }`}
            >
              <MoonIcon className="size-5" />
              تم تاریک
            </li>
            <li
              onClick={() => handleThemeChange("system")}
              className={`py-2 px-4 flex gap-2 items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === "system" ? "bg-gray-200 dark:bg-gray-600" : ""
                }`}
            >
              <ComputerDesktopIcon className="size-5" />
              تم سیستم
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
