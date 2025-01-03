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
import { useTranslation } from "react-i18next";

const changePassword = () => {
  const { t } = useTranslation();
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
          t("passwordUpdateSuccess"),
          "success"
        );

        setTimeout(() => {
          navigate("/login");
          removeCookie("access_token", "");
        }, 300);
      } else {
        notify(t("passwordUpdateError"), "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      notify(t("genericError"), "error");
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
            label={t("currentPasswordLabel")}
            {...register("currentPassword", {
              required: t("currentPasswordRequired"),
            })}
            errorText={errors.currentPassword?.message}
            className="self-center"
          />
        </div>
        <div className="w-full grid grid-cols-12 items-start gap-4">
            <Input
              className="self-center md:col-span-4 col-span-12"
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
              label={t("newPasswordLabel")}
              {...register("newPassword", {
                required: t("newPasswordRequired"),
              })}
              errorText={errors.newPassword?.message}
            />
            <Input
              defaultValue={""}
              className="md:col-span-4 col-span-12"
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
              label={t("repeatPasswordLabel")}
              {...register("confirmPassowrd", {
                required: t("repeatPasswordRequired"),
                validate: (value) =>
                  value === getValues("newPassword") ||
                  t("passwordsMismatch"),
              })}
              errorText={errors.confirmPassowrd?.message}
            />
          <Button
            loading={submitLoading ? true : false}
            className="sm:col-span-4 col-span-12 mt-4 w-fit px-8"
            type={"submit"}
          >
            {t("changePasswordButton")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default changePassword;