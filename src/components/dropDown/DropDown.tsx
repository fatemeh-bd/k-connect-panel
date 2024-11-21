import Select from "react-select";
const DropDown = ({
  className,
  options,
}: {
  className?: string;
  options: { label: string; value: string }[];
}) => {
  return <Select options={options} className={`${className} w-full`} />;
};

export default DropDown;
