import { useForm } from "react-hook-form";
import Button from "../../../../components/buttons/Button";
import Input from "../../../../components/inputs/Input";
import { boxStyle } from "../../../../utils/enums";
type Inputs = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string
}



const editProfile = () => {



    const { register, formState: { errors }, handleSubmit } = useForm<Inputs>();
    const submitFrom = () => {
        alert('Submit From')
    };



    return (
        <form className="space-y-3" onSubmit={handleSubmit(() => submitFrom())}>
            <div className={`${boxStyle}  grid grid-cols-12 gap-2`} >
                <div className="md:col-span-12 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
                    <Input label="ایمیل" readOnly />
                </div>
                <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
                    <Input label="نام "  {...register("firstName", { required: " نام را وارد کنید" })} errorText={errors.firstName?.message} />
                </div>
                <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
                    <Input label="نام خانوادگی"  {...register("lastName", { required: "نام خانوادگی را وارد کنید" })} errorText={errors.lastName?.message} />
                </div>
                <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
                    <Input label="شماره موبایل"  {...register("phoneNumber", { required: "شماره موبایل را وارد کنید" })} errorText={errors.phoneNumber?.message} />
                </div>

                <Button className=" col-span-2 h-fit self-center" type={"submit"} >ثبت کاربر</Button>

            </div>
        </form>


    );
}

export default editProfile;