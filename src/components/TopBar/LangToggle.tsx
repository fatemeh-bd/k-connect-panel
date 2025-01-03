import { useEffect, useRef, useState } from "react";

import { useLang } from "../../context/LangProvider";

export default function LangToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { lang, setLang } = useLang(); // Using the LangProvider

  const handleLangChange = (selectedLang: "Fa" | "En" | "Ru") => {
    setLang(selectedLang); // Update language via context
    setIsOpen(false); // Close dropdown
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

  useEffect(() => {
    document.body.style.direction = lang === "Fa" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="size-9 bg-secondary-100 rounded-full text-secondary-600 flex items-center justify-center"
      >
        {lang}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 text-sm left-0 z-50 bg-white border border-secondary-200 shadow-lg rounded-lg w-48">
          <ul className="flex flex-col">
            <li
              onClick={() => handleLangChange("En")}
              className={`py-2 px-4 flex gap-2 items-center cursor-pointer hover:bg-secondary-100 ${
                lang === "En" ? "bg-secondary-200" : ""
              }`}
            >
              English
            </li>
            <li
              onClick={() => handleLangChange("Fa")}
              className={`py-2 px-4 flex gap-2 items-center cursor-pointer hover:bg-secondary-100 ${
                lang === "Fa" ? "bg-secondary-200" : ""
              }`}
            >
              Persian
            </li>
            <li
              onClick={() => handleLangChange("Ru")}
              className={`py-2 px-4 flex gap-2 items-center cursor-pointer hover:bg-secondary-100 ${
                lang === "Ru" ? "bg-secondary-200" : ""
              }`}
            >
              Русский
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}