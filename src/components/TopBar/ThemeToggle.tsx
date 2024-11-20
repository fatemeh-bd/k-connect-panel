import { useState, useEffect, useRef } from "react";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [IsOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleThemeChange = (selectedTheme: "light" | "dark" | "system") => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="size-9 bg-secondary-100 rounded-full text-secondary-600 flex items-center justify-center"
      >
        {theme === "dark" ? (
          <SunIcon className="dark:text-yellow-500 size-6" />
        ) : theme === "system" ? (
          <ComputerDesktopIcon className="size-6" />
        ) : (
          <MoonIcon className="dark:text-blue-500 size-6" />
        )}
      </button>

      {IsOpen && (
        <div className="absolute top-full mt-2 text-sm left-0 z-50 bg-white border border-secondary-200 shadow-lg rounded-lg w-48">
          <ul className="flex flex-col">
            <li
              onClick={() => handleThemeChange("light")}
              className={`py-2 px-4 flex gap-2 items-center !cursor-pointer hover:bg-secondary-100 ${
                theme === "light" ? "bg-secondary-200" : ""
              }`}
            >
              <SunIcon className="size-5" />
              تم روشن
            </li>
            <li
              onClick={() => handleThemeChange("dark")}
              className={`py-2 px-4 flex gap-2 items-center !cursor-pointer hover:bg-secondary-100 ${
                theme === "dark" ? "bg-secondary-200" : ""
              }`}
            >
              <MoonIcon className="size-5" />
              تم تاریک
            </li>
            <li
              onClick={() => handleThemeChange("system")}
              className={`py-2 px-4 flex gap-2 items-center !cursor-pointer hover:bg-secondary-100 ${
                theme === "system"
                  ? "bg-secondary-200 dark:bg-secondary-500"
                  : ""
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
