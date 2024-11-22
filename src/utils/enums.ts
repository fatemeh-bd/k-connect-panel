import React from "react";
export type SvgType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export const boxStyle = "bg-white shadow-sm rounded-lg lg:p-5 p-4";
export const inputClass =
  "w-full bg-transparent placeholder:text-secondary-500 text-secondary-800 text-sm border border-secondary-200 rounded-md p-3.5";
export enum ColorType {
  PRIMARY = "primary",
  BLACK = "secondary-800",
  SUCCESS = "teal-500",
  ERROR = "rose-500",
  SECONDARY = "purple-700",
}
export enum Sizes {
  xs = "xs",
  sm = "sm",
  lg = "lg",
  xl = "xl",
}
export enum TicketStatusEnums {
  OPEN = "باز",
  CLOSE = "بسته شده",
}
export const TicketStatusMapping: {
  [key: number]: { text: string; color: string };
} = {
  1: { text: TicketStatusEnums.OPEN, color: ColorType.SUCCESS },
  2: { text: TicketStatusEnums.CLOSE, color: ColorType.ERROR },
};
