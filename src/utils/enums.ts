import React from "react";
export type SvgType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export const boxStyle = "bg-white dark:bg-boxColor shadow-sm rounded lg:p-5 p-4";
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
