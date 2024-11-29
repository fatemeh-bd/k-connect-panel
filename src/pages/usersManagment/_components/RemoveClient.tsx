"use client";

import Button from "../../../components/buttons/Button";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

import { notify } from "../../../utils/notify";
import { ApiResponse } from "../../Supports/_components/AddTicket";
import { useMutation } from "react-query";
import { removeClient } from "./requests";
import Paragraph from "../../../components/typography/Paragraph";
import { ColorType } from "../../../utils/enums";
import { ClientDataType } from "../UsersManagment";
interface RemoveClientProps {
  clientData: ClientDataType;
  setClose: Dispatch<SetStateAction<boolean>>;
  onAddClient: () => void;
}
type RemoveClientInputs = {
  id: number;
};

const RemoveClient = ({
  clientData,
  setClose,
  onAddClient,
}: RemoveClientProps) => {
  const { mutate, isLoading: addLoading } = useMutation<
    ApiResponse<any>,
    Error,
    RemoveClientInputs
  >(
    async function () {
      const res = await removeClient(clientData.id);
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
        notify(data.message, "success");
      },
      onError: (error) => {
        notify(error?.message, "error");
      },
    }
  );

  const { handleSubmit } = useForm<RemoveClientInputs>();

  const submitFrom = async (input: RemoveClientInputs) => {
    mutate(input);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(submitFrom)}>
      <div className="grid grid-cols-12 items-start gap-x-4">
        <Paragraph
          type={ColorType.ERROR}
          className="col-span-12 py-4  text-center rounded-md"
        >
          حذف کاربر `{clientData?.userName}`
        </Paragraph>
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
          <Paragraph>این عمل قابل بازگشت نمی باشد</Paragraph>
        </div>
      </div>
      <Button
        loading={addLoading}
        disabled={addLoading}
        className="w-full"
        type="submit"
      >
        حذف
      </Button>

      <Button
        themeType={ColorType.ERROR}
        onClick={() => setClose(false)}
        className="w-full"
        type={"button"}
      >
        بخیال
      </Button>
    </form>
  );
};

export default RemoveClient;
