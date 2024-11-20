import { ButtonHTMLAttributes } from "react";
import { ColorType, SvgType } from "../../utils/enums";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  children: React.ReactNode;
  className?: string;
  themeType?: ColorType.SUCCESS | ColorType.ERROR;
  outline?: boolean;
  full?: boolean;
  Icon?: SvgType;
};
