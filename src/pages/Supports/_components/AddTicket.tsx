import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Button from "../../../components/buttons/Button";
import DropDown, { SelectType } from "../../../components/dropDown/DropDown";
import Input from "../../../components/inputs/Input";
import TextArea from "../../../components/inputs/TextArea";
import { useMutation, useQuery } from "react-query";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  forwardRef,
} from "react";
import { getMethodGeneric, postMethod } from "../../../api/callApi";
import { CREATE_TICKET, SUPPORT_SECTIONS_LIST } from "../../../api/endpoints";
import { useForm } from "react-hook-form";
import { notify } from "../../../utils/notify";

export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
}

interface AddTicketType {
  title: string;
  section: string;
  message: string;
}

const AddTicket = forwardRef<
  HTMLFormElement,
  { setClose: Dispatch<SetStateAction<boolean>>; onAddTicket: () => void }
>(({ setClose, onAddTicket }, ref) => {
  const [isMounted, setIsMounted] = useState(false);
  const {
    register,
    watch,
    trigger,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<AddTicketType>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { mutate, isLoading: addLoading } = useMutation<
    ApiResponse<any>,
    Error,
    AddTicketType
  >(
    async (data: AddTicketType) => {
      const formData = new FormData();
      formData.append("TicketSectionId", data.section);
      formData.append("Message", data.message);
      formData.append("Title", data.title);
      const response = await postMethod(CREATE_TICKET, formData);

      return response;
    },
    {
      onSuccess: (res) => {
        console.log(res);
        if (res?.isSuccess) {
          setClose(false);
          onAddTicket();
        } else {
          res?.message.split("|").map((i) => notify(i, "error"));
        }
      },
      onError: (error) => {
        notify(error?.message, "error");
      },
    }
  );

  const { data = [], isLoading } = useQuery(
    "support-sections",
    () =>
      getMethodGeneric<ApiResponse<SelectType[]>>(SUPPORT_SECTIONS_LIST).then(
        (res) => {
          if (res?.isSuccess) {
            return res.data;
          }
          return [];
        }
      ),
    {
      enabled: isMounted,
    }
  );

  const createTicketHandler = (data: AddTicketType) => {
    mutate(data);
  };

  return (
    <form
      ref={ref}
      className="space-y-3"
      onSubmit={handleSubmit(createTicketHandler)}
    >
      <div className="grid grid-cols-12 items-start gap-x-4">
        <Input
          label="عنوان تیکت"
          className="md:col-span-6 col-span-12"
          {...register("title", {
            required: "عنوان تیکت الزامی است",
          })}
          errorText={errors.title?.message}
        />
        <DropDown
          options={data}
          className="md:col-span-6 col-span-12 self-center"
          onSelect={(e) => {
            setValue("section", e.value);
            trigger("section");
          }}
          placeholder={
            isLoading ? "در حال بارگذاری..." : "بخش پشتیبانی را انتخاب کنید"
          }
          {...register("section", {
            required: "بخش پشتیبانی را انتخاب کنید",
          })}
          errorText={errors.section?.message}
        />
        <TextArea
          {...register("message", {
            required: "متن پیام را وارد کنید",
          })}
          onChange={(e) => {
            setValue("message", e.target.value);
            trigger("message");
          }}
          value={watch("message")}
          placeholder="متن تیکت را وارد کنید"
          className="col-span-12"
          errorText={errors.message?.message}
        />
      </div>
      <Button
        type="submit"
        className="mr-auto [&>svg]:rotate-180 flex-row-reverse"
        Icon={PaperAirplaneIcon}
        loading={addLoading}
      >
        ارسال تیکت
      </Button>
    </form>
  );
});

export default AddTicket;
