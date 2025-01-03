import { useState } from "react";
import { postMethod } from "../../../../api/callApi";
import Button from "../../../../components/buttons/Button";
import Input from "../../../../components/inputs/Input";
import { useLang } from "../../../../context/LangProvider";
import { useProfile } from "../../../../store/profileSlice";
import { notify } from "../../../../utils/notify";
import { useForm } from "react-hook-form";
import { EDIT_PROFILE } from "../../../../api/endpoints";
import { boxStyle } from "../../../../utils/enums";
type Inputs = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};
const editProfile = () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const { getTranslation } = useLang();
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

      if (response?.isSuccess) {
        notify(getTranslation("profileUpdatedSuccess"), "success");
      } else {
        notify(
          response.message || getTranslation("profileUpdatedError"),
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      notify(getTranslation("genericError"), "error");
      setSubmitLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className={`${boxStyle} grid grid-cols-12 gap-2 items-start`}>
        <div className="md:col-span-4 col-span-12 flex gap-4 md:mb-0 mb-3 items-center">
          <Input
            label={getTranslation("name")}
            defaultValue={info.firstName}
            {...register("firstName", {
              required: getTranslation("firstNameRequired"),
            })}
            errorText={errors.firstName?.message}
          />
        </div>
        <div className="md:col-span-4 col-span-12 flex gap-4 md:mb-0 mb-3 items-center">
          <Input
            label={getTranslation("lastName")}
            defaultValue={info.lastName}
            {...register("lastName", {
              required: getTranslation("lastNameRequired"),
            })}
            errorText={errors.lastName?.message}
          />
        </div>
        <div className="md:col-span-4 col-span-12 flex gap-4 md:mb-0 mb-3 items-center">
          <Input
            disabled={!!info.phoneNumber}
            label={getTranslation("mobileNumber")}
            defaultValue={info.phoneNumber}
            type="number"
            {...register("phoneNumber", {
              required: getTranslation("phoneNumberRequired"),
              pattern: {
                value: /^[0-9]+$/,
                message: getTranslation("phoneNumberPattern"),
              },
              minLength: {
                value: 11,
                message: getTranslation("phoneNumberLength"),
              },
              maxLength: {
                value: 11,
                message: getTranslation("phoneNumberLength"),
              },
            })}
            errorText={errors.phoneNumber?.message}
          />
        </div>
        <div className="md:col-span-4 col-span-12 flex gap-4 md:mb-0 mb-3 items-center">
          <Input
            label={getTranslation("email")}
            readOnly
            value={info.sellerInfo.email}
          />
        </div>
        <Button
        loading={submitLoading}
          className="col-span-2 h-fit self-center"
          type="submit"
          
        >
          {getTranslation("submitButton")}
        </Button>
      </div>
    </form>
  );
};

export default editProfile;
