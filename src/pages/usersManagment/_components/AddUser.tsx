import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/buttons/Button";
import DropDown from "../../../components/dropDown/DropDown";
import Input from "../../../components/inputs/Input";
import Paragraph from "../../../components/typography/Paragraph";
import { Sizes } from "../../../utils/enums";
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect } from "react";
import { useMutation, useQueries } from "react-query";
import { fetchPlans, fetchServerList, fetchServerLocations } from "./requests";
import { notify } from "../../../utils/notify";
import { numberWithCommas } from "../../../utils/helper";

type Inputs = {
  userName: string;
  password: string;
  phoneNumber: string;
  serverPlanId: number | string;
  serverLocationId: string;
  serverId: number | string;
};
const AddUser = () => {
  const checkUserNameExist = (e: string) => {
    //cal Api
    alert(e);
  };
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<Inputs>();
  const submitFrom = () => {
    // mutateSubmit(data);
  };

  const results = useQueries([
    {
      queryKey: "plans",
      queryFn: fetchPlans,
    },
    {
      queryKey: "serverLocation",
      queryFn: fetchServerLocations,
    },
  ]);

  const { data: plans, isLoading: plansLoading } = results[0];
  const { data: serverLocation, isLoading: serverLocationLoading } = results[1];
  const {
    mutate,
    isLoading: serverLoading,
    data: serverList,
  } = useMutation(fetchServerList, {
    onSuccess: (response) => {
      if (response?.isSuccess) {
        return response.data;
      } else {
        notify(response.message, "success");
      }
    },
    onError: (error: any) => {
      notify(error?.message, "error");
    },
  });

  //   const { mutate: mutateSubmit, isLoading: submitLoader } = useMutation(
  //     submitUser,
  //     {
  //       onSuccess: (response) => {
  //         if (response?.isSuccess) {
  //           return response.data;
  //         } else {
  //           notify(response.message, "success");
  //         }
  //       },
  //       onError: (error: any) => {
  //         notify(error?.message, "error");
  //       },
  //     }
  //   );
  useEffect(() => {
    if (watch("serverLocationId")) mutate(watch("serverLocationId"));
  }, [watch("serverLocationId")]);
  return (
    <form className="space-y-3" onSubmit={handleSubmit(submitFrom)}>
      <div className="grid grid-cols-12 items-start gap-x-4">
        <Input
          label="نام کاربری"
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            checkUserNameExist(e.target.value)
          }
          {...register("userName", { required: "نام کاربری را وارد کنید" })}
          errorText={errors.userName?.message}
          className="md:col-span-6 col-span-12"
        />
        <Input label="شماره موبایل " className="md:col-span-6 col-span-12" />
        <DropDown
          className="col-span-12 mb-3"
          options={plans}
          onSelect={(e) => {
            setValue("serverPlanId", e.value);
            trigger("serverPlanId");
          }}
          loading={plansLoading}
          placeholder="انتخاب پلن"
          {...register("serverPlanId", { required: " پلن  را  انتخاب کنید" })}
          errorText={errors.serverPlanId?.message}
        />
        <DropDown
          className="col-span-12 mb-3"
          options={serverLocation}
          loading={serverLocationLoading}
          placeholder=" انتخاب لوکیشن پلن"
          {...register("serverLocationId", {
            required: " لوکیشن پلن  را انتخاب کنید",
          })}
          onSelect={(e) => {
            setValue("serverLocationId", e.value);
            trigger("serverLocationId");
          }}
          errorText={errors.serverLocationId?.message}
        />
        <DropDown
          className="col-span-12 mb-3"
          options={serverList}
          loading={serverLoading}
          placeholder=" انتخاب سرور"
          disabled={watch("serverLocationId") ? false : true}
          {...register("serverId", { required: "سرور  را انتخاب کنید" })}
          onSelect={(e) => {
            setValue("serverId", e.value);
            trigger("serverId");
          }}
          errorText={errors.serverId?.message}
        />
      </div>

      {watch("serverPlanId") && (
        <Paragraph size={Sizes.xl} className="flex items-center gap-2">
          <CurrencyDollarIcon className="size-6 text-purple-900" />
          قیمت : {numberWithCommas(4090000)} تومان
        </Paragraph>
      )}
      <Button className="w-full" type={"submit"}>
        ثبت کاربر
      </Button>
    </form>
  );
};
export default AddUser;
