import { boxStyle } from "../../../../utils/enums";
import { useForm } from "react-hook-form";
import Button from "../../../../components/buttons/Button";
import Input from "../../../../components/inputs/Input";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

const changePassword = () => {

    type Inputs = {
        newPassowrd: string,
        confirmPassowrd: string
        oldPassword: string
    }
    const [passwordVisible, setPasswordVisible] = useState({
        currentPassword: false,
        newPassword: false,
        repeatPassword: false
        ,
    });

    const { register, formState: { errors }, handleSubmit } = useForm<Inputs>();
    const submitFrom = () => {
        alert('Submit From')
    };
    const togglePasswordVisibility = (type: "currentPassword" | "newPassword" | "repeatPassword") => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    };

    return (
        <form className="space-y-3" onSubmit={handleSubmit(() => submitFrom())}>
            <div className={`${boxStyle}  grid grid-cols-12 gap-2`} >
                <div className="md:col-span-12 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
                    <Input
                        type={passwordVisible.currentPassword ? "text" : "password"}
                        icon={
                            <div
                                onClick={() => togglePasswordVisibility("currentPassword")}
                                className="cursor-pointer"
                            >
                                {passwordVisible.currentPassword ? (
                                    <EyeSlashIcon className="w-5 h-5 text-secondary-500" />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-secondary-500" />
                                )}
                            </div>
                        }

                        label="کلمه عبور کنونی" {...register("oldPassword", { required: " کلمه عبور کنونی را وارد کنید" })} errorText={errors.oldPassword?.message} />
                </div>
                <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
                    <Input

                        type={passwordVisible.newPassword ? "text" : "password"}
                        icon={
                            <div
                                onClick={() => togglePasswordVisibility("newPassword")}
                                className="cursor-pointer"
                            >
                                {passwordVisible.newPassword ? (
                                    <EyeSlashIcon className="w-5 h-5 text-secondary-500" />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-secondary-500" />
                                )}
                            </div>
                        }



                        label="کلمه عبور جدید "  {...register("newPassowrd", { required: " کلمه عبور جدید را وارد کنید" })} errorText={errors.newPassowrd?.message} />
                </div>
                <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
                    <Input

                        type={passwordVisible.repeatPassword ? "text" : "password"}
                        icon={
                            <div
                                onClick={() => togglePasswordVisibility("repeatPassword")}
                                className="cursor-pointer"
                            >
                                {passwordVisible.repeatPassword ? (
                                    <EyeSlashIcon className="w-5 h-5 text-secondary-500" />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-secondary-500" />
                                )}
                            </div>
                        }


                        label="تکرار کلمه عبور جدید "  {...register("confirmPassowrd", { required: "تکرار کلمه عبور جدید را وارد کنید" })} errorText={errors.confirmPassowrd?.message} />
                </div>

                <Button className=" col-span-2 h-fit self-center" type={"submit"} >تغییر کلمه عبور</Button>

            </div>
        </form>


    );
}

export default changePassword;