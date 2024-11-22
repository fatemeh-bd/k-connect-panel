import Select from "react-select";
const DropDown = ({
  className,
  options,
}: {
  className?: string;
  options: { label: string; value: string }[];
}) => {

  const selectStyle = {
    // control: styles => ({ ...styles, backgroundColor: 'transparent',borderColor:"" }),
    // option: (styles) => {
    //   return {
    //     ...styles,
    //     color: '#FFF'
    //   };
    // },
  };
  return <Select styles={selectStyle} options={options} className={`${className} w-full`} />;
};

export default DropDown;
