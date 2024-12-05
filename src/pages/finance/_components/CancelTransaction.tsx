"use client";

import Button from "../../../components/buttons/Button";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

import { notify } from "../../../utils/notify";
import { ApiResponse } from "../../Supports/_components/AddTicket";
import { useMutation } from "react-query";
import Paragraph from "../../../components/typography/Paragraph";
import { ColorType } from "../../../utils/enums";
import { postMethod } from "../../../api/callApi";
import { CANCEL_TRANSACTION } from "../../../api/endpoints";
import { CancelTransactionData } from "../Finance";
interface CancelTransactionProps {
  modalData: CancelTransactionData;
  setClose: Dispatch<SetStateAction<boolean>>;
  onAddClient: () => void;
}
type CancelTransactionInputs = {
  id: number;
};

const CancelTransaction = ({
  modalData,
  setClose,
  onAddClient,
}: CancelTransactionProps) => {
  const { mutate, isLoading: addLoading } = useMutation<
    ApiResponse<any>,
    Error,
    CancelTransactionInputs
  >(
    async function () {
      const res = await cancelTrnsaction(modalData.id);
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
  const cancelTrnsaction = async (id: number) => {
    const res = await postMethod(CANCEL_TRANSACTION + `?id=${id}`, {});
    if (res?.isSuccess) {
      return res;
    } else {
      notify(res.message, "error");
      return [];
    }
  };

  const { handleSubmit } = useForm<CancelTransaction>();

  const submitFrom = async (input: CancelTransaction) => {
    mutate(input);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(submitFrom)}>
      <div className="grid grid-cols-12 items-start gap-x-4">
        <Paragraph
          type={ColorType.ERROR}
          className="col-span-12 py-4  text-center rounded-md"
        >
          لغو تراکنش
        </Paragraph>
      </div>

      <Button loading={addLoading} className="w-full" type="submit">
        لغو تراکنش
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

export default CancelTransaction;
