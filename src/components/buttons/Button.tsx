import React from "react";
import { ButtonProps } from "./types";
import { ColorType } from "../../utils/enums";

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  themeType,
  outline,
  full,
  ...props
}) => {
  const buttonClass = `${
    full ? "w-full" : "min-w-[100px]"
  } flex text-sm cursor-pointer font-medium items-center justify-center gap-2 rounded-lg  transition-all hover:opacity-80 p-3.5 ${className} ${
    themeType === ColorType.ERROR
      ? "bg-rose-600 text-[#fff]"
      : "bg-primary text-white"
  } ${outline ? "!bg-transparent" : ""}`;

  return (
    <button type="button" name="Button" className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
