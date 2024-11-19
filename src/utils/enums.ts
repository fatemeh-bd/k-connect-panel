import React from "react";
export type SvgType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export const boxStyle =
  "bg-white dark:bg-zinc-900 shadow-sm dark:shadow-black rounded-2xl lg:p-5 p-4";
export enum ColorType {
  PRIMARY = "primary",
  BLACK = "black",
  SUCCESS = "success",
  ERROR = "error",
}
export enum Sizes {
  xs = "xs",
  sm = "sm",
  lg = "lg",
  xl = "xl",
}
