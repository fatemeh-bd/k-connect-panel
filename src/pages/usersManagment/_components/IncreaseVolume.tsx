"use client";

import Button from "../../../components/buttons/Button";
import Input from "../../../components/inputs/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

import { notify } from "../../../utils/notify";
import { ApiResponse } from "../../Supports/_components/AddTicket";
import { useMutation } from "react-query";
import { increaseVolume } from "./requests";
import Paragraph from "../../../components/typography/Paragraph";
import { numberWithCommas } from "../../../utils/helper";
interface IncreaseVolumeProps {
  clientData: [];
  setClose: Dispatch<SetStateAction<boolean>>;
  onAddClient: () => void;
}
type IncreaseVolumeInputs = {
  unitGb: number;
};

const IncreaseVolume = ({
  clientData,
  setClose,
  onAddClient,
}: IncreaseVolumeProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IncreaseVolumeInputs>();

  const { mutate, isLoading: addLoading } = useMutation<
    ApiResponse<any>,
    Error,
    IncreaseVolumeInputs
  >(
    async function (input: IncreaseVolumeInputs) {
      const res = await increaseVolume(clientData.id, input.unitGb);
      console.log(res);
      if (res?.isSuccess) {
        setClose(false);
        onAddClient();
        return res;
      } else {
        res?.message.split("|").map((i) => notify(i, "error"));
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
        notify(data.message, "success");
      },
      onError: (error) => {
        notify(error?.message, "error");
      },
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );
  const submitFrom = async (input: IncreaseVolumeInputs) => {
    mutate(input);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(submitFrom)}>
      <div className="grid grid-cols-12 items-start gap-x-4">
        <Paragraph className="col-span-12 py-4 bg-fuchsia-950 text-white text-center rounded-md">
          افزایش حجم برای کاربر `{clientData?.userName}`
        </Paragraph>
        <Paragraph className="col-span-12 py-2">
          پلن انتخابی `{clientData?.planName}`
        </Paragraph>
        <Input
          label="حجم"
          {...register("unitGb", {
            required: "حجم را وارد کنید",

            min: {
              value: 5,
              message: "حجم باید حداقل 5 گیگابایت باشد",
            },
          })}
          errorText={errors.unitGb?.message}
          className="col-span-12"
        />
      </div>
      <div
        className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <Paragraph> بهای هر 1 گیگ {numberWithCommas(1000)}تومان</Paragraph>
        </div>
      </div>
      <Button
        loading={addLoading}
        disabled={addLoading}
        className="w-full"
        type="submit"
      >
        ثبت
      </Button>
    </form>
  );
};

export default IncreaseVolume;
