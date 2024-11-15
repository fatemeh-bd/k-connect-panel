import React from "react";
import { ColorType, Sizes } from "../../utils/enums";

export interface ParagraphType {
  children: React.ReactNode;
  type?: ColorType;
  size?: Sizes;
  className?: string;
}
