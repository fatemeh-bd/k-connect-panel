import { boxStyle } from "../../../../utils/enums";
import { useForm } from "react-hook-form";
import Button from "../../../../components/buttons/Button";
import Input from "../../../../components/inputs/Input";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { postMethod } from "../../../../api/callApi";
import { notify } from "../../../../utils/notify";
import { CHANGE_PASSOWRD } from "../../../../api/endpoints";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const changePassword = () => {
  const [submitLoading, setSubmitLoading] = useState<Boolean>(false);
  const navigate = useNavigate();
  type Inputs = {
    newPassword: string;
    currentPassword: string;
    confirmPassowrd: string;
  };
  const [passwordVisible, setPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    repeatPassword: false,
  });
  const [, removeCookie] = useCookies(["access_token"]);
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();
  const onSubmit = async (input: Inputs) => {
    try {
      setSubmitLoading(true);
      const response = await postMethod(CHANGE_PASSOWRD, input);
      setSubmitLoading(false);

      if (response?.isSuccess) {
        notify(
          response?.message || "اطلاعات با موفقیت به‌روزرسانی شد",
          "success"
        );

        setTimeout(() => {
          navigate("/login");
          removeCookie("access_token", "");
        }, 300);
      } else {
        notify(response.message || "خطا در به‌روزرسانی اطلاعات", "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      notify("خطایی رخ داد. لطفاً دوباره تلاش کنید.", "error");
      setSubmitLoading(false);
    }
  };
  const togglePasswordVisibility = (
    type: "currentPassword" | "newPassword" | "repeatPassword"
  ) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className={`${boxStyle}  flex flex-col items-start`}>
        <div className="flex gap-4 w-full">
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
            defaultValue={""}
            label="کلمه عبور کنونی"
            {...register("currentPassword", {
              required: " کلمه عبور کنونی را وارد کنید",
            })}
            errorText={errors.currentPassword?.message}
            className="self-center"
          />
        </div>
        <div className="w-full flex justify-start items-start gap-4">
          <div className="flex w-full max-w-[300px] gap-4 items-center">
            <Input
              className="self-center"
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
              label="کلمه عبور جدید "
              {...register("newPassword", {
                required: " کلمه عبور جدید را وارد کنید",
              })}
              errorText={errors.newPassword?.message}
            />
          </div>
          <div className="flex w-full max-w-[300px] gap-4 items-center">
            <Input
              defaultValue={""}
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
              label="تکرار کلمه عبور جدید "
              {...register("confirmPassowrd", {
                required: "تکرار کلمه عبور جدید را وارد کنید",
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "کلمه عبور با تکرار آن مطابقت ندارد",
              })}
              errorText={errors.confirmPassowrd?.message}
            />
          </div>
          <Button
            loading={submitLoading ? true : false}
            className="max-h-[50px] min-w-[108px] h-fit mt-4"
            type={"submit"}
          >
            تغییر کلمه عبور
          </Button>
        </div>
      </div>
    </form>
  );
};

export default changePassword;
