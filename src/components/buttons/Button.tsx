import React from "react";
import { ButtonProps } from "./types";
import { ColorType } from "../../utils/enums";
import Loader from "../loaders/Loader";

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  themeType,
  outline,
  full,
  Icon,
  loading,
  ...props
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
      ? "bg-purple border-purple !text-[#fff]"
      : `bg-primary dark:bg-gray-300   dark:text-gray-800 border-primary  text-white ${
          outline ? "!text-secondary-800" : ""
        }`
  } ${outline ? "!bg-transparent" : ""}`;

  return (
    <button type="button" name="Button" className={buttonClass} {...props}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {Icon && <Icon className="size-5" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
