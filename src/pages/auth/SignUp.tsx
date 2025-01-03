import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/inputs/Input";
import Paragraph from "../../components/typography/Paragraph";
import Title from "../../components/typography/Title";
import AuthLayout from "./AuthLayout";
import Button from "../../components/buttons/Button";
import { ColorType } from "../../utils/enums";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { SignUpFormType } from "./types";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { postMethod } from "../../api/callApi";
import { useLang } from "../../context/LangProvider";
import { REGISTER } from "../../api/endpoints";

const SignUp = () => {
  const { lang, t } = useLang();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SignUpFormType>();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [, setCookie] = useCookies(["access_token"]);
  const [error, setError] = useState<string>("");
  const { mutate, isLoading } = useMutation(
    (data: SignUpFormType) =>
      postMethod(REGISTER, {
        userName: data.email,
        password: data.password,
      }),
    {
      onSuccess: (res) => {
        if (res?.isSuccess) {
          setCookie("access_token", res.data.accessToken, { path: "/" });
          navigate("/");
        } else {
          setError(res.message);
        }
      },
      onError: () => {},
    }
  );

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const signUpHandler = (data: SignUpFormType) => {
    mutate(data);
  };

  const password = watch("password");

  return (
    <AuthLayout>
      <div className="lg:w-[85%] sm:w-[380px] w-full sm:px-2 px-4 mx-auto">
        <div className="space-y-3">
          <Title>{t("signUpWelcome")}</Title>
        </div>
        <form className="mt-6" onSubmit={handleSubmit(signUpHandler)}>
          <Input
            type="email"
            label={t("usernameLabel")}
            {...register("email", {
              required: t("emailRequired"),
              pattern: {
                value: /^\S+@\S+$/i,
                message: t("emailInvalid"),
              },
            })}
            errorText={errors.email?.message}
          />

          <Input
            type={passwordVisible ? "text" : "password"}
            icon={
              <div
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
              >
                {passwordVisible ? (
                  <EyeSlashIcon className="w-5 h-5 text-secondary-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-secondary-500" />
                )}
              </div>
            }
            label={t("passwordLabel")}
            {...register("password", {
              required: t("passwordRequired"),
              minLength: {
                value: 6,
                message: t("passwordMinLength"),
              },
            })}
            errorText={errors.password?.message}
          />

          <Input
            type={passwordVisible ? "text" : "password"}
            icon={
              <div
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
              >
                {passwordVisible ? (
                  <EyeSlashIcon className="w-5 h-5 text-secondary-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-secondary-500" />
                )}
              </div>
            }
            label={t("repeatPasswordLabel")}
            {...register("repeatPassword", {
              required: t("repeatPasswordRequired"),
              validate: (value) =>
                value === password || t("passwordsMismatch"),
            })}
            errorText={errors.repeatPassword?.message}
          />

          {error && <Paragraph type={ColorType.ERROR}>{error}</Paragraph>}

          <Button className="mt-10" full type="submit" loading={isLoading}>
            {t("signUpButton")}
          </Button>
        </form>

        <div className="flex items-center gap-1 mt-3">
          <Paragraph type={ColorType.PRIMARY}>{t("alreadyHaveAccount")}</Paragraph>
          <Link to={"/login"} className="underline">
            {t("loginLink")}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;