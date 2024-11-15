import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/inputs/Input";
import Paragraph from "../../components/typography/Paragraph";
import Title from "../../components/typography/Title";
import AuthLayout from "./AuthLayout";
import Button from "../../components/buttons/Button";
import { ColorType } from "../../utils/enums";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Correct import for icons
import { LoginFormType } from "./types";
import { useCookies } from "react-cookie";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormType>();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [, setCookie] = useCookies(["access_token"]);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  const loginHandler = () => {
    setCookie("access_token", "token example");
    navigate("/");
  };
  return (
    <AuthLayout>
      <div className="lg:w-[85%] sm:w-[380px] w-full sm:px-2 px-4 mx-auto">
        <div className="space-y-3">
          <Title>به پنل خوش آمدید</Title>
          <Paragraph>نام کاربری و گذرواژه خود را برای ورود وارد کنید</Paragraph>
        </div>
        <form className="mt-6" onSubmit={handleSubmit(loginHandler)}>
          <Input
            type="email"
            label="نام کاربری (ایمیل)"
            {...register("email", {
              required: "ایمیل خود را وارد کنید",
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
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </div>
            }
            label="کلمه عبور"
            {...register("password", {
              required: "کلمه عبور خود را وارد کنید",
            })}
            errorText={errors.password?.message}
          />

          <Button className="mt-10" full type="submit">
            ورود به پنل
          </Button>
        </form>

        <div className="flex items-center gap-1 mt-3">
          <Paragraph type={ColorType.PRIMARY}>ثبت نام نکردی عزیزم؟</Paragraph>
          <Link to={"/signUp"} className="underline">
            ایجاد حساب کاربری
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
