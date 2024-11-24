"use client";

import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/buttons/Button";
import DropDown from "../../../components/dropDown/DropDown";
import Input from "../../../components/inputs/Input";
import Paragraph from "../../../components/typography/Paragraph";
import { ColorType, Sizes } from "../../../utils/enums";
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQueries } from "react-query";
import {
  fetchPlans,
  fetchServerList,
  fetchServerLocations,
  fetchUserNameExist,
} from "./requests";
import { notify } from "../../../utils/notify";
import { numberWithCommas } from "../../../utils/helper";
import { useSubmitClient } from "../Hooks/useSubmitClient";

type Inputs = {
  userName: string;
  password: string;
  phoneNumber: string;
  planId: number | string;
  serverLocationId: string;
  serverId: number | string;
};

const AddUser = () => {
  const [userNameExist, setUserNameExist] = useState<boolean>(false);
  const [planPrice, setPlanPrice] = useState<number>(0);

  const checkUserNameExist = async (e: string) => {
    if (e.length > 0) {
      var data = await fetchUserNameExist(e);
      setUserNameExist(data === true);
    }
  };

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<Inputs>();

  const { mutate: submitClient, isLoading: submitClientLoading } =
    useSubmitClient();

  const submitFrom = async (input: Inputs) => {
    const response = await submitClient(input);

    console.log(
      "%csrcpagessersManagment_componentsAddUser.tsx:57 response",
      "color: #007acc;",
      response
    );
  };

  const results = useQueries([
    {
      queryKey: "plans",
      queryFn: fetchPlans,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
    {
      queryKey: "serverLocation",
      queryFn: fetchServerLocations,
      refetchOnWindowFocus: false,
      refetchInterval: false,
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

  useEffect(() => {
    if (watch("serverLocationId")) mutate(watch("serverLocationId"));
  }, [watch("serverLocationId"), mutate]);

  useEffect(() => {
    const selectedPlanId = watch("planId");
    if (selectedPlanId && plans) {
      const selectedPlan = plans.find(
        (plan: any) => plan.value === selectedPlanId
      );
      if (selectedPlan) {
        setPlanPrice(selectedPlan.price);
      }
    }
  }, [watch("planId"), plans]);

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
        <Input
          label="شماره موبایل "
          {...register("phoneNumber")}
          className="md:col-span-6 col-span-12"
        />
        <DropDown
          className="col-span-12 mb-3"
          options={plans}
          onSelect={(e) => {
            setValue("planId", e.value);
            trigger("planId");
          }}
          loading={plansLoading}
          placeholder="انتخاب پلن"
          {...register("planId", { required: " پلن  را  انتخاب کنید" })}
          errorText={errors.planId?.message}
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
          disabled={!watch("serverLocationId")}
          {...register("serverId", { required: "سرور  را انتخاب کنید" })}
          onSelect={(e) => {
            setValue("serverId", e.value);
            trigger("serverId");
          }}
          errorText={errors.serverId?.message}
        />
      </div>

      {watch("planId") && (
        <Paragraph size={Sizes.xl} className="flex items-center gap-2">
          <CurrencyDollarIcon className="size-6 text-purple-900" />
          قیمت : {numberWithCommas(planPrice)} تومان
        </Paragraph>
      )}

      {userNameExist ? (
        <Paragraph type={ColorType.ERROR}>
          نام کاربری از قبل وجود دارد
        </Paragraph>
      ) : (
        <Button loading={submitClientLoading} className="w-full" type="submit">
          ثبت کاربر
        </Button>
      )}
    </form>
  );
};

export default AddUser;
