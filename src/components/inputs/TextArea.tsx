import { FC } from "react";
import { TextAreaType } from "./types";
import { ColorType, inputClass } from "../../utils/enums";
import Paragraph from "../typography/Paragraph";

const TextArea: FC<TextAreaType> = ({ className, value, errorText, ...rest }) => {
  return (
    <div className={`my-2 ${className || ""}`}>
      <textarea
        value={value} 
        className={`resize-none min-h-[180px] ${inputClass} `}
        {...rest}
      />
      {errorText && <Paragraph type={ColorType.ERROR}>{errorText}</Paragraph>}
    </div>
  );
};

export default TextArea;
