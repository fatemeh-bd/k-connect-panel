import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Button from "../../../components/buttons/Button";
import DropDown from "../../../components/dropDown/DropDown";
import Input from "../../../components/inputs/Input";
import TextArea from "../../../components/inputs/TextArea";

const AddTicket = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <form className="space-y-3">
      <div className="grid grid-cols-12 items-center gap-x-4">
        <Input label="عنوان تیکت" className="col-span-6" />
        <DropDown className="col-span-6" options={options} />
        <TextArea placeholder="متن تیکت را وارد کنید" className="col-span-12" />
      </div>
      <Button
        className="mr-auto [&>svg]:rotate-180 flex-row-reverse"
        Icon={PaperAirplaneIcon}
      >
        ارسال تیکت
      </Button>
    </form>
  );
};
export default AddTicket;
