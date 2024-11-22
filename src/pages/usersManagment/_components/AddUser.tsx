import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/buttons/Button";
import DropDown from "../../../components/dropDown/DropDown";
import Input from "../../../components/inputs/Input";
import Paragraph from "../../../components/typography/Paragraph";
import { Sizes } from "../../../utils/enums";
import { useForm } from "react-hook-form"
import { ChangeEvent } from "react";

type Inputs = {
    userName: string
    password: string
    phoneNumber: string
    serverPlanId: number
    serverLocationId: number
    serverId: number
}
const AddUser = () => {
    const checkUserNameExist = (e: string) => {
        //cal Api
        alert(e)
    }
    const { register, watch, formState: { errors }, handleSubmit } = useForm<Inputs>();
    const submitFrom = () => {
        alert('Submit From')
    };
    const planList = [
        { value: "1", label: "یک ماهه حجمی (30 روزه، 40 گیگ) 40 گیگ " },
        { value: "2", label: "دو ماهه حجمی (60 روزه، 80 گیگ) 80 گیگ " },
        { value: "3", label: "سه ماهه حجمی (90 روزه، 120 گیگ) 120 گیگ " },
        { value: "4", label: "شش ماهه حجمی (180 روزه، 240 گیگ) 240 گیگ " },
    ];
    const serverLocationList = [
        { value: "1", label: "آلمان" },
        { value: "2", label: "ترکیه" },
        { value: "3", label: "فرانسه" },
        { value: "4", label: "انگلیس" },
    ];
    const serverList = [
        { value: "1", label: "حجمی آلمان 34 ظرفیت: 131" },
        { value: "2", label: "دو ماهه حجمی (60 روزه، 80 گیگ) 80 گیگ " },
        { value: "3", label: "سه ماهه حجمی (90 روزه، 120 گیگ) 120 گیگ " },
        { value: "4", label: "شش ماهه حجمی (180 روزه، 240 گیگ) 240 گیگ " },
    ];
    return (
        <form className="space-y-3" onSubmit={handleSubmit(() => submitFrom())}>
            <div className="grid grid-cols-12 items-start gap-x-4">
                <Input label="نام کاربری" onInput={(e: ChangeEvent<HTMLInputElement>) => checkUserNameExist(e.target.value)} {...register("userName", { required: "نام کاربری را وارد کنید" })} errorText={errors.userName?.message} className="col-span-6" />
                <Input label="شماره موبایل " className="col-span-6" />
                <DropDown className="col-span-12 mb-3" options={planList}   {...register("serverPlanId", { required: " پلن  را  انتخاب کنید" })} errorText={errors.serverPlanId?.message} />
                <DropDown className="col-span-12 mb-3" options={serverLocationList}  {...register("serverLocationId", { required: " لوکیشن پلن  را انتخاب کنید" })} errorText={errors.serverLocationId?.message} />
                <DropDown className="col-span-12 mb-3" options={serverList}   {...register("serverId", { required: "سرور  را انتخاب کنید" })} errorText={errors.serverId?.message} />
            </div>

            {
                watch("serverPlanId") && <Paragraph size={Sizes.xl} className="flex items-center gap-2" >
                    <CurrencyDollarIcon className="size-6 text-purple-900" />

                    قیمت : 40,000 تومان
                </Paragraph>
            }
            <Button className="w-full" type={"submit"}>ثبت کاربر</Button>
        </form>
    );
};
export default AddUser;
