import { useForm } from "react-hook-form";
import Button from "../../../../components/buttons/Button";
import Input from "../../../../components/inputs/Input";
import { boxStyle } from "../../../../utils/enums";
import { postMethod } from "../../../../api/callApi";
import { notify } from "../../../../utils/notify";
import { EDIT_PROFILE } from "../../../../api/endpoints";
import { useState } from "react";
import { useProfile } from "../../../../store/profileSlice";
type Inputs = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};
const editProfile = () => {
  const [submitLoading, setSubmitLoading] = useState<Boolean>(false);

  const { info } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = async (input: Inputs) => {
    try {
      setSubmitLoading(true);
      const response = await postMethod(EDIT_PROFILE, input);
      setSubmitLoading(false);

      // Handle API response
      if (response?.isSuccess) {
        notify("اطلاعات با موفقیت به‌روزرسانی شد", "success");
      } else {
        notify(response.message || "خطا در به‌روزرسانی اطلاعات", "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      notify("خطایی رخ داد. لطفاً دوباره تلاش کنید.", "error");
      setSubmitLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className={`${boxStyle}  grid grid-cols-12 gap-2 items-start`}>
        <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
          <Input
            label="نام "
            defaultValue={info.firstName}
            {...register("firstName", {
              required: "نام را وارد کنید",
            })}
          />
        </div>
        <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
          <Input
            label="نام خانوادگی"
            defaultValue={info.lastName}
            {...register("lastName", { required: "نام خانوادگی را وارد کنید" })}
            errorText={errors.lastName?.message}
          />
        </div>
        <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
          <Input
            disabled={info.phoneNumber ? true : false}
            label="شماره موبایل"
            defaultValue={info.phoneNumber}
            type="number"
            {...register("phoneNumber", {
              required: "شماره موبایل را وارد کنید",
              pattern: {
                value: /^[0-9]+$/, // Regex for numeric values only
                message: "شماره موبایل باید فقط شامل اعداد باشد", // Validation message for non-numeric input
              },
              minLength: {
                value: 11,
                message: "شماره موبایل باید 11 رقم باشد", // Validation message for short length
              },
              maxLength: {
                value: 11,
                message: "شماره موبایل نباید بیش از 11 رقم باشد", // Validation message for long length
              },
            })}
            errorText={errors.phoneNumber?.message}
          />
        </div>

        <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
          <Input label="ایمیل" readOnly value={info.sellerInfo.email} />
        </div>
        <Button
          loading={submitLoading ? true : false}
          className=" col-span-2 h-fit self-center"
          type={"submit"}
        >
          ثبت
        </Button>
      </div>
    </form>
  );
};

export default editProfile;
