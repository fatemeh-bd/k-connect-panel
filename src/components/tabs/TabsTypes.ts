import { ReactNode } from "react";
import { SvgType } from "../../utils/enums";

export interface TabType {
  id: number;
  label: string;
  icon: SvgType;
}
export interface TabsProps {
  tabs: TabType[];
  componets: ReactNode[];
}

