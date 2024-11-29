import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/inputs/Input";
import Paragraph from "../../components/typography/Paragraph";
import Title from "../../components/typography/Title";
import LoginLayout from "./AuthLayout";
import Button from "../../components/buttons/Button";
import { ColorType } from "../../utils/enums";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Correct import for icons
import { SignUpFormType } from "./types";
import { useMutation } from "react-query";
import { postMethod } from "../../api/callApi";
import { REGISTER } from "../../api/endpoints";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SignUpFormType>();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const { mutate, isLoading } = useMutation(
    (data: SignUpFormType) =>
      postMethod(REGISTER, {
        email: data.email,
        password: data.password,
      }),
    {
      onSuccess: (res) => {
        if (res?.isSuccess) {
          navigate("/login");
        } else {
          setError(res.message);
        }
      },
      onError: () => {},
    }
  );

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const password = watch("password");

  const signupHandler = (data: SignUpFormType) => {
    mutate(data);
  };

  return (
    <LoginLayout>
      <div className="lg:w-[85%] w-full min-w-[300px] mx-auto">
        <div className="space-y-3">
          <Title>به پنل خوش آمدید</Title>
          <Paragraph>
            نام کاربری و گذرواژه خود را برای ثبت نام وارد کنید
          </Paragraph>
        </div>
        <form className="mt-6" onSubmit={handleSubmit(signupHandler)}>
          <Input
            type="email"
            label="نام کاربری (ایمیل)"
            {...register("email", {
              required: "ایمیل خود را وارد کنید",
            })}
            errorText={errors.email?.message?.toString()}
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
            label="کلمه عبور"
            {...register("password", {
              required: "کلمه عبور خود را وارد کنید",
              minLength: {
                value: 6,
                message: "کلمه عبور باید حداقل 6 کاراکتر باشد",
              },
            })}
            errorText={errors.password?.message?.toString()}
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
            label="تکرار کلمه عبور"
            {...register("repeatPassword", {
              required: "تکرار کلمه عبور خود را وارد کنید",
              validate: (value) =>
                value === password || "کلمه عبور و تکرار آن مطابقت ندارند",
            })}
            errorText={errors.repeatPassword?.message?.toString()}
          />
          {error && <Paragraph type={ColorType.ERROR}>{error}</Paragraph>}

          <Button className="mt-10" full type="submit" loading={isLoading}>
            ثبت و ورود به پنل
          </Button>
        </form>

        <div className="flex items-center gap-1 mt-3">
          <Paragraph type={ColorType.PRIMARY}>حساب کاربری داری؟</Paragraph>
          <Link to={"/login"} className="underline">
            ورود به حساب کاربریم
          </Link>
        </div>
      </div>
    </LoginLayout>
  );
};

export default SignUp;
