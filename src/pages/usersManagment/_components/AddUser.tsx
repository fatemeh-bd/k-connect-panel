"use client";

import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/buttons/Button";
import DropDown from "../../../components/dropDown/DropDown";
import Input from "../../../components/inputs/Input";
import Paragraph from "../../../components/typography/Paragraph";
import { ColorType, Sizes } from "../../../utils/enums";
import { useForm } from "react-hook-form";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useMutation, useQueries } from "react-query";
import {
  fetchPlans,
  fetchServerList,
  fetchServerLocations,
  fetchUserNameExist,
} from "./requests";
import { notify } from "../../../utils/notify";
import { numberWithCommas } from "../../../utils/helper";
import { postMethod } from "../../../api/callApi";
import { CREATE_CLIENT } from "../../../api/endpoints";
import { ApiResponse } from "../../Supports/_components/AddTicket";
import { useLang } from "../../../context/LangProvider";
import { translations } from "../../../context/translations";
interface AddUserProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  onAddClient: () => void;
}
type Inputs = {
  userName: string;
  password: string;
  phoneNumber: string;
  planId: number | string;
  serverLocationId: string;
  serverId: number | string;
};

const AddUser = ({ setClose, onAddClient }: AddUserProps) => {
  const { lang } = useLang();
  const [userNameExist, setUserNameExist] = useState<boolean>(false);
  const [planPrice, setPlanPrice] = useState<number>(0);

  const checkUserNameExist = async (e: string) => {
    if (e.length > 0) {
      // eslint-disable-next-line no-var
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

  const { mutate: createUser, isLoading: addLoading } = useMutation<
    ApiResponse<any>,
    Error,
    Inputs
  >(
    async function (input: Inputs) {
      const res = await postMethod(CREATE_CLIENT, input);
      console.log(res);
      if (res?.isSuccess) {
        setClose(false);
        onAddClient();
        return res;
      } else {
        res?.message.split("|").map((i: string) => notify(i, "error"));
        return res;
      }
    },
    {
      onSuccess: (data) => {
        console.log(
          "%csrcagesManagmentcomponentsddUser.tsx:81 data",
          "color: #007acc;",
          data
        );
        if (data.isSuccess) {
          notify(data.message, "success");
        }
      },
      onError: (error) => {
        notify(error?.message, "error");
      },
    }
  );
  const submitFrom = async (input: Inputs) => {
    await createUser(input);
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
          label={translations[lang].userName}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            checkUserNameExist(e.target.value)
          }
          {...register("userName", {
            required: translations[lang].enterUsername,
          })}
          errorText={errors.userName?.message}
          className="md:col-span-6 col-span-12"
        />
        <Input
          label={translations[lang].phoneNumber}
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
          placeholder={translations[lang].selectedPlan}
          {...register("planId", { required: translations[lang].selectPlan })}
          errorText={errors.planId?.message}
        />
        <DropDown
          className="col-span-12 mb-3"
          options={serverLocation}
          loading={serverLocationLoading}
          placeholder={translations[lang].selectPlanLocation}
          {...register("serverLocationId", {
            required: translations[lang].selectLocationPlan,
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
          placeholder={translations[lang].selectServer}
          disabled={!watch("serverLocationId")}
          {...register("serverId", {
            required: translations[lang].selectServer,
          })}
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
          {translations[lang].usernameAlreadyExists}
        </Paragraph>
      ) : (
        ""
      )}

      <Button
        loading={addLoading}
        disabled={userNameExist}
        className="w-full"
        type="submit"
      >
        {translations[lang].createUser}
      </Button>
    </form>
  );
};

export default AddUser;
