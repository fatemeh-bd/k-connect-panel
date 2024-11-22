import Button from "../../../components/buttons/Button";
import DropDown from "../../../components/dropDown/DropDown";
import Input from "../../../components/inputs/Input";
import TextArea from "../../../components/inputs/TextArea";

const AddUser = () => {
    const options = [
        { value: "1", label: "یک ماهه حجمی (30 روزه، 40 گیگ) 40 گیگ " },
        { value: "2", label: "دو ماهه حجمی (60 روزه، 80 گیگ) 80 گیگ " },
        { value: "3", label: "سه ماهه حجمی (90 روزه، 120 گیگ) 120 گیگ " },
        { value: "4", label: "شش ماهه حجمی (180 روزه، 240 گیگ) 240 گیگ " },
    ];
    return (
        <form className="space-y-3">
            <div className="grid grid-cols-12 items-center gap-x-4">
                <Input label="نام کاربری" className="col-span-12" />
                <Input label="شماره موبایل " className="col-span-12" />
                <Input label="کلمه عبور" className="col-span-12" />
                <DropDown className="col-span-12" options={options} />
                <TextArea placeholder="متن تیکت را وارد کنید" className="col-span-12" />
            </div>
            <Button className="mr-auto">ارسال تیکت</Button>
        </form>
    );
};
export default AddUser;
