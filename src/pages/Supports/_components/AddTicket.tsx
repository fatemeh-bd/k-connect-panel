import Button from "../../../components/buttons/Button";
import Input from "../../../components/inputs/Input";
import TextArea from "../../../components/inputs/TextArea";

const AddTicket = () => {
  return (
    <form className="space-y-3">
      <div className="grid grid-cols-12 gap-x-4">
        <Input label="عنوان تیکت" className="col-span-6" />
        <Input label="بخش تیکت" className="col-span-6" />
        <TextArea placeholder="متن تیکت را وارد کنید" className="col-span-12" />
      </div>
      <Button className="mr-auto">ارسال تیکت</Button>
    </form>
  );
};
export default AddTicket;
