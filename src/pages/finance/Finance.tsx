/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import { numberWithCommas } from "../../utils/helper";
import { createRoot } from "react-dom/client";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import CustomeDataTable from "../../components/DataTable/DataTable";
import { BASE_URL, getMethodGeneric, postMethod } from "../../api/callApi";
import {
  CREATE_TRANSACTION_NETWORK,
  CryptoTransaction,
  GET_NETWORK,
} from "../../api/endpoints";
import DropDown, { SelectType } from "../../components/dropDown/DropDown";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { notify } from "../../utils/notify";
import { useForm } from "react-hook-form";
import Modal from "../../components/modal/Modal";
import CancelTransaction from "./_components/CancelTransaction";
import { fetchCryptoStat, fetchUSDStat } from "./requests";
interface AddTransacton {
  networkId: string;
  price: number;
}

export interface CancelTransactionData {
  id: number;
}
export interface ApiResponseWithData<T> {
  isSuccess: boolean;
  data: T;
  message: string;
}
export interface ApiResponse {
  isSuccess: boolean;
  data: [];
  message: string;
}
export default function Financial() {
  const navigate = useNavigate();

  const [refreshKey, setRefreshKey] = useState<number>(0); // Add refresh key
  const [cancelModal, setCancelModal] = useState<boolean>(false); // Add refresh key
  const [getrowData, setRowData] = useState<CancelTransactionData>({
    id: 0,
  }); // Add refresh key

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetch
  };

  const { data: cryptoResult = [] } = useQuery(
    "crypto",
    async () => {
      // setCryptoUpdatel(true);
      const res = await fetchCryptoStat();
      // setCryptoUpdatel(false);

      return res;
    },
    {
      refetchInterval: 10000, // هر 6 ثانیه یکبار (واحد: میلی‌ثانیه)
    }
  );
  const { data: iranCurrency } = useQuery(
    "USDStat",
    async () => {
      // setCryptoUpdatel(true);
      const res = await fetchUSDStat();
      // setCryptoUpdatel(false);

      return res;
    },
    {
      refetchInterval: 6000, // هر 6 ثانیه یکبار (واحد: میلی‌ثانیه)
    }
  );

  const columns = [
    {
      data: "id",
      name: "id",
      orderable: true,
      width: "",
      autoWidth: "",
      title: "شناسه رهگیری",
      searchable: true,
      visible: true,
    },
    {
      data: "title",
      name: "title",
      orderable: true,
      width: "",
      autoWidth: "",
      title: "عنوان",
      searchable: true,
      visible: true,
    },
    {
      data: "requestAmount",
      name: "requestAmount",

      orderable: true,
      width: "",
      autoWidth: "",
      title: "مبلغ درخواستی",
      searchable: true,
      visible: true,
    },
    {
      data: "paidAmount",
      name: "paidAmount",
      orderable: false,
      width: "",
      autoWidth: "",
      title: "مبلغ واریزی",
      searchable: true,
      visible: true,
      // renderModel:
    },
    {
      data: "cryptoName",
      name: "cryptoName",
      orderable: false,
      width: "",
      autoWidth: "",
      title: "ارز انتخابی",
      searchable: true,
      visible: true,
      // renderModel:
    },
    {
      data: "createAt",
      name: "createAt",
      orderable: false,
      width: "",
      autoWidth: "",
      title: "تاریخ ایجاد",
      searchable: true,
      visible: true,
      // renderModel:
    },
    {
      data: "id", // We will use this for the operations column
      name: "id",
      orderable: false,
      width: "320px",
      autoWidth: false,
      title: "عملیات",
      searchable: false,
      visible: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
        const container = document.createElement("div");
        td.innerHTML = "";
        td.appendChild(container);

        const root = createRoot(container);
        root.render(
          <div className="flex gap-2">
            {rowData.status === "منقضی شده" ? (
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                این سفارش منقضی شده است
              </span>
            ) : rowData.status === "پرداخت شده" ? (
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                این سفارش پرداخت شده است
              </span>
            ) : rowData.status === "در انتظار پرداخت" ? (
              <>
                <Button
                  Icon={InformationCircleIcon}
                  onClick={() => navigate(`/financial/${cellData}`)}
                >
                  پرداخت
                </Button>
                <Button
                  Icon={InformationCircleIcon}
                  onClick={() => {
                    setCancelModal(true);
                    setRowData(rowData);
                  }}
                >
                  باطل کن
                </Button>
              </>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];
  const {
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<AddTransacton>();

  const { data = [], isLoading } = useQuery("support-sections", () =>
    getMethodGeneric<ApiResponseWithData<SelectType[]>>(GET_NETWORK).then(
      (res) => {
        if (res?.isSuccess) {
          return res.data;
        }
        return [];
      }
    )
  );
  const { mutate, isLoading: addLoading } = useMutation<
    ApiResponse,
    Error,
    AddTransacton
  >(
    async (data: AddTransacton) => {
      const response = await postMethod(CREATE_TRANSACTION_NETWORK, data);

      return response;
    },
    {
      onSuccess: (res) => {
        console.log(res);
        if (res?.isSuccess) {
          notify(res.message, "success");
          handleRefresh();
          reset();
        } else {
          res?.message.split("|").map((i) => notify(i, "error"));
        }
      },
      onError: (error) => {
        notify(error?.message, "error");
      },
    }
  );

  const reateTransactionHandler = (data: AddTransacton) => {
    mutate(data);
  };

  return (
    <div className="space-y-2 light:bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cryptoResult.map((crypto: any) => (
          <div key={crypto.key} className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <svg
                  className="h-8 w-8 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-semibold">{crypto.key}</p>
                  <p className="text-sm text-gray-500">{crypto.name}</p>
                </div>
              </div>
              {/* {cryptoUpdate ? (
                <div className="flex flex-col items-end justify-end gap-1">
                <CustomSkeleton height="h-[22px] w-[80px]" />
                <CustomSkeleton height="h-[22px] w-[90px]" />

                </div>
              ) : ( */}
                <div className="">
                  <p className="font-semibold text-end">
                    ${numberWithCommas(crypto.price)}
                  </p>

                  <p className="text-green-500">
                    {Math.round(
                      crypto.price * iranCurrency?.data.currency[0].price
                    ).toLocaleString("fa-IR")}{" "}
                    تومان
                  </p>
                </div>
              {/* )} */}
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Creation Section */}
      <div className="bg-white rounded-lg  p-6">
        <h2 className=" font-semibold mb-4">ایجاد فاکتور جدید</h2>
        <form onSubmit={handleSubmit(reateTransactionHandler)}>
          <div className="grid grid-cols-1 md:grid-cols-6  items-center  gap-2 ">
            <Input
              label="مبلغ"
              {...register("price", {
                required: "مبلغ الزامی است",
              })}
              errorText={errors.price?.message}
              placeholder="مبلغ  را وارد کنید"
            ></Input>
            <DropDown
              className="w-[300px] "
              options={data}
              loading={isLoading}
              onSelect={(e) => {
                setValue("networkId", e.value);
              }}
              placeholder={
                isLoading ? "در حال بارگذاری..." : " شبکه را انتخاب کنید"
              }
              {...register("networkId", {
                required: "بخش شبکه را انتخاب کنید",
              })}
              errorText={errors.networkId?.message}
            ></DropDown>

            <Button type="submit" loading={addLoading}>
              ایجاد آدرس واریز
            </Button>
          </div>
        </form>

        {/* Financial Reports Table */}
        <div className="bg-white rounded-lg  p-6">
          <CustomeDataTable
            urlRequest={`${BASE_URL + CryptoTransaction}`}
            columns={columns}
            key={refreshKey}
          />
        </div>

        <Modal
          isOpen={cancelModal}
          onClose={() => setCancelModal(false)}
          title="لغو فاکتور"
          className="md:min-w-[450px] min-w-[90%]"
        >
          <CancelTransaction
            modalData={getrowData}
            onAddClient={handleRefresh}
            setClose={setCancelModal}
          ></CancelTransaction>
        </Modal>
      </div>
    </div>
  );
}
