import { useForm } from "react-hook-form";
import Button from "../../../../components/buttons/Button";
import Input from "../../../../components/inputs/Input";
import { boxStyle } from "../../../../utils/enums";
import { postMethod } from "../../../../api/callApi";
import { notify } from "../../../../utils/notify";
import { useQuery } from "react-query";
import { EDIT_PROFILE, GET_PROFILE } from "../../../../api/endpoints";
import CustomSkeleton from "../../../../components/skeleton/skeleton";
import { useState } from "react";
type Inputs = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};
const editProfile = () => {
  const fetchProfile = async () => {
    const response = await postMethod(GET_PROFILE, {});
    if (response?.isSuccess) {
      return response.data;
    } else {
      notify(response.message, "error");
      return {};
    }
  };

  const [submitLoading, setSubmitLoading] = useState<Boolean>(false);

  const { data = {}, isLoading } = useQuery("َAccountProfile", async () => {
    return await fetchProfile();
  });

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
  if (isLoading) {
    return (
      <div>
        <div className={`${boxStyle} grid grid-cols-12 gap-6 p-6`}>
          <div className="md:col-span-12 col-span-12 flex  gap-2">
            <CustomSkeleton width="w-full" height="h-10" />
          </div>
        </div>

        <div className={`${boxStyle} grid grid-cols-12 gap-6 p-6`}>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="md:col-span-4 col-span-12 flex  gap-2">
              <CustomSkeleton width="w-full" height="h-10" />
            </div>
          ))}
        </div>
        <div className={`${boxStyle} grid grid-cols-12 gap-6 p-6`}>
          <div className="md:col-span-4 col-span-12 flex  gap-2">
            <CustomSkeleton width="w-40" height="h-10" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className={`${boxStyle}  grid grid-cols-12 gap-2`}>
        <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
          <Input
            label="نام "
            defaultValue={data.firstName}
            {...register("firstName", {
              required: "نام را وارد کنید",
            })}
          />
        </div>
        <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
          <Input
            label="نام خانوادگی"
            defaultValue={data.lastName}
            {...register("lastName", { required: "نام خانوادگی را وارد کنید" })}
            errorText={errors.lastName?.message}
          />
        </div>
        <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
          <Input
            disabled={data.phoneNumber ? false : true}
            label="شماره موبایل"
            defaultValue={data.phoneNumber}
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
          <Input label="ایمیل" readOnly value={data.sellerInfo.email} />
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
