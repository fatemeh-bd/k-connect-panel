import Select from "react-select";
import Paragraph from "../typography/Paragraph";
import { ColorType } from "../../utils/enums";

const DropDown = ({
  className,
  options,
  errorText,
 // onChange
}: {
  className?: string;
  options: { label: string; value: string }[];
  errorText?: string;
 // onChange?: (e: { label: string; value: string }) => void
}) => {
  const selectStyle = {
    control: (styles: any, { isFocused }: { isFocused: boolean }) => ({
      ...styles,
      backgroundColor: "transparent",
      borderColor: isFocused ? "var(--primary)" : "var(--gray200)",
      borderRadius: 7,
      padding: "0.4rem",
      color: "var(--gray800)",
      fontSize: 12,
      boxShadow: isFocused
        ? "0 0 0 0.5px var(--primary)"
        : "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    }),
    option: (styles: any, { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }) => ({
      ...styles,
      color: isSelected ? "var(--gray200)" : "var(--gray800)",
      backgroundColor: isSelected
        ? "var(--primary)"
        : isFocused
          ? "rgba(0, 0, 0, 0.1)"
          : "transparent",
      cursor: "pointer",
      ":active": {
        backgroundColor: "var(--primary)",
      },
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: "var(--gray400)",
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: "var(--gray800)",
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      color: "var(--gray400)",
    }),
  };

  return (
    <div className={`${className} w-full`}>
      <Select styles={selectStyle} options={options}/>
      {

        errorText ? <Paragraph type={ColorType.ERROR} className="mt-2 ">{errorText}</Paragraph> : ""
      }
    </div>
  )
};

export default DropDown;
