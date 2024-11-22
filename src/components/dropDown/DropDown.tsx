import Select, { SingleValue } from "react-select";
import Paragraph from "../typography/Paragraph";
import { ColorType, Sizes } from "../../utils/enums";
export type SelectType = {
  label: string;
  value: string;
};
const DropDown = ({
  className,
  options,
  errorText,
  onSelect,
  loading,
  disabled,
  placeholder = "انتخاب کنید",
  noOptionsMessage = "آیتمی یافت نشد",
}: {
  className?: string;
  options: SelectType[];
  errorText?: string;
  placeholder?: string;
  loading?: boolean;
  noOptionsMessage?: string;
  onSelect: (e: SelectType) => void;
  disabled?:boolean
}) => {
  const selectStyle = {
    control: (styles: any, { isFocused }: { isFocused: boolean }) => ({
      ...styles,
      backgroundColor: "transparent",
      borderColor: isFocused ? "var(--primary)" : "var(--gray200)",
      borderRadius: 7,
      padding: "0.4rem",
      color: "var(--gray800)",
      fontSize: 13,
      boxShadow: isFocused
        ? "0 0 0 0.5px var(--primary)"
        : "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    }),
    option: (
      styles: any,
      { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }
    ) => ({
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
      <Select
        styles={selectStyle}
        isDisabled={disabled}
        placeholder={loading ? "در حال بارگذاری..." : placeholder}
        options={options}
        onChange={(newValue: SingleValue<SelectType>) => {
          if (newValue) {
            onSelect(newValue);
          }
        }}
        noOptionsMessage={() => (
          <Paragraph size={Sizes.sm}>{noOptionsMessage}</Paragraph>
        )}
      />
      {errorText ? (
        <Paragraph type={ColorType.ERROR} className="mt-2 ">
          {errorText}
        </Paragraph>
      ) : (
        ""
      )}
    </div>
  );
};

export default DropDown;
