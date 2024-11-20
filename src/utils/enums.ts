import React from "react";
export type SvgType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export const boxStyle = "bg-white shadow-sm rounded lg:p-5 p-4";
export enum ColorType {
  PRIMARY = "primary",
  BLACK = "secondary-800",
  SUCCESS = "teal-500",
  ERROR = "rose-500",
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
