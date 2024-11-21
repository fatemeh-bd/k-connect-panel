import React from "react";
import { ButtonLinkProps } from "./types";
import { ColorType } from "../../utils/enums";
import { Link } from "react-router-dom";

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  className,
  themeType,
  outline,
  full,
  Icon,
  href,
}) => {
  const buttonClass = `${
    full ? "w-full" : "min-w-[100px]"
  } flex text-sm cursor-pointer border font-medium items-center justify-center gap-2 rounded-lg  transition-all hover:opacity-80 p-3.5 ${className} ${
    themeType === ColorType.ERROR
      ? `bg-rose-500 ${
          outline ? "text-rose-500" : "text-[#fff]"
        } border-rose-500`
      : themeType === ColorType.SUCCESS
      ? "bg-teal-500  border-teal-500"
      : themeType === ColorType.SECONDARY
      ? "bg-purple-700 border-purple-700"
      : `bg-primary dark:bg-gray-300  dark:text-gray-800 border-primary  text-white ${
          outline ? "!text-secondary-800" : ""
        }`
  } ${outline ? "!bg-transparent" : ""}`;

  return (
    <Link to={href} className={buttonClass}>
      {Icon && <Icon className="size-5" />}
      {children}
    </Link>
  );
};

export default ButtonLink;
