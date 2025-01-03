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
import { LoginFormType } from "./types";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { postMethod } from "../../api/callApi";
import { LOGIN } from "../../api/endpoints";
import { useLang } from "../../context/LangProvider";

const Login = () => {
  const { getTranslation: t } = useLang();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormType>();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [, setCookie] = useCookies(["access_token"]);
  const [error, setError] = useState<string>("");
  const { mutate, isLoading } = useMutation(
    (data: LoginFormType) =>
      postMethod(LOGIN, {
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

  const loginHandler = (data: LoginFormType) => {
    mutate(data);
  };

  return (
    <AuthLayout>
      <div className="lg:w-[85%] sm:w-[380px] w-full sm:px-2 px-4 mx-auto">
        <div className="space-y-3">
          <Title>{t("loginWelcome")}</Title>
          <Paragraph>{t("loginDescription")}</Paragraph>
        </div>
        <form className="mt-6" onSubmit={handleSubmit(loginHandler)}>
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
            })}
            errorText={errors.password?.message}
          />

          {error && <Paragraph type={ColorType.ERROR}>{error}</Paragraph>}
          <Button
            className="mt-10"
            full
            type="submit"
            disabled={isLoading}
            loading={isLoading}
          >
            {t("loginButton")}
          </Button>
        </form>

        <div className="flex items-center gap-1 mt-3">
          <Paragraph type={ColorType.PRIMARY}>{t("signUpPrompt")}</Paragraph>
          <Link to={"/signUp"} className="underline">
            {t("signUpLink")}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;