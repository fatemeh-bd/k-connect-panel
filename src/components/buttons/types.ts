import { ButtonHTMLAttributes } from "react";
import { ColorType } from "../../utils/enums";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  children: React.ReactNode;
  className?: string;
  themeType?: ColorType.ERROR;
  outline?: boolean;
  full?: boolean;
};
