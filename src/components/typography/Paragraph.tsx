import { ColorType, Sizes } from "../../utils/enums";
import { ParagraphType } from "./types";

const Paragraph = ({ children, type, size, className }: ParagraphType) => {
  return (
    <p
      className={`${
        size === Sizes.sm
          ? "text-sm"
          : size === Sizes.xs
          ? "text-xs"
          : size === Sizes.xl
          ? "text-xl"
          : "sm:text-base text-sm"
      } ${
        type === ColorType.PRIMARY
          ? "text-primary"
          : type === ColorType.BLACK
          ? "text-black"
          : type === ColorType.SUCCESS
          ? "text-teal-500"
          : type === ColorType.ERROR
          ? "text-rose-500 !text-sm"
          : ""
      } ${className || ""}`}
    >
      {children}
    </p>
  );
};

export default Paragraph;
