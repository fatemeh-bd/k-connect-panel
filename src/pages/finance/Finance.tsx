import { useState } from "react";
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import { numberWithCommas } from "../../utils/helper";
import { createRoot } from "react-dom/client";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import CustomeDataTable from "../../components/DataTable/DataTable";
import { BASE_URL } from "../../api/callApi";
import { TICKET_LIST } from "../../api/endpoints";
import DropDown from "../../components/dropDown/DropDown";
import { useNavigate } from "react-router-dom";

export default function Financial() {
  const navigate = useNavigate();
  // Simulated crypto data
  const cryptoData = [
    {
      name: "بیت کوین",
      symbol: "BTC",
      price: "41,235.67",
      change: "+2.5%",
      irPrice: 500000,
    },
    {
      name: "اتریوم",
      symbol: "ETH",
      price: "2,234.12",
      change: "-1.2%",
      irPrice: 500000,
    },
    {
      name: "تتر",
      symbol: "USDT",
      price: "1.00",
      change: "0%",
      irPrice: 500000,
    },
    {
      name: "بایننس کوین",
      symbol: "BNB",
      price: "312.45",
      change: "+0.8%",
      irPrice: 500000,
    },
  ];
  const columns = [
    {
      data: "title",
      name: "title",
      orderable: true,
      width: "",
      autoWidth: "",
      title: "شناسه رهگیری",
      searchable: true,
      visible: true,
    },
    {
      data: "ticketStatus",
      name: "ticketStatus",
      orderable: true,
      width: "",
      autoWidth: "",
      title: "عنوان",
      searchable: true,
      visible: true,
    },
    {
      data: "sectionName",
      name: "sectionName",

      orderable: true,
      width: "",
      autoWidth: "",
      title: "مبلغ درخواستی",
      searchable: true,
      visible: true,
    },
    {
      data: "createdAt",
      name: "createdAt",
      orderable: false,
      width: "",
      autoWidth: "",
      title: "مبلغ واریزی",
      searchable: true,
      visible: true,
      // renderModel:
    },
    {
      data: "createdAt",
      name: "createdAt",
      orderable: false,
      width: "",
      autoWidth: "",
      title: "ارز انتخابی",
      searchable: true,
      visible: true,
      // renderModel:
    },
    {
      data: "createdAt",
      name: "createdAt",
      orderable: false,
      width: "",
      autoWidth: "",
      title: "تاریخ ایجاد",
      searchable: true,
      visible: true,
      // renderModel:
    },
    {
      data: "createdAt",
      name: "createdAt",
      orderable: false,
      width: "",
      autoWidth: "",
      title: "وضعیت",
      searchable: true,
      visible: true,
      // renderModel:
    },
    {
      data: "id", // We will use this for the operations column
      name: "id",
      orderable: false,
      width: "300px",
      autoWidth: false,
      title: "عملیات",
      searchable: false,
      visible: true,
      // @ts-ignore
      createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
        const container = document.createElement("div");
        td.innerHTML = "";
        td.appendChild(container);

        const root = createRoot(container);
        root.render(
          <div className="flex gap-2">
            <Button
              Icon={InformationCircleIcon}
              onClick={() => navigate(`/financial/${cellData}`)}
            >
              پرداخت
            </Button>
            <Button Icon={InformationCircleIcon}>باطل کن</Button>
          </div>
        );
      },
    },
  ];
  const [amount, setAmount] = useState("");
  return (
    <div className="space-y-2 light:bg-gray-100 min-h-screen">
      {/* Crypto Prices Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cryptoData.map((crypto) => (
          <div key={crypto.symbol} className="bg-white rounded-lg p-4">
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
                  <p className="font-semibold">{crypto.name}</p>
                  <p className="text-sm text-gray-500">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${crypto.price}</p>

                <p className="text-green-500">
                  {numberWithCommas(crypto.irPrice)} تومان
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Creation Section */}
      <div className="bg-white rounded-lg  p-6">
        <h2 className=" font-semibold mb-4">ایجاد فاکتور جدید</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 items-center  gap-2 ">
          <Input
            label="مبلغ"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></Input>
          <DropDown
            className="w-[300px] "
            onSelect={(e) => alert(e.value)}
            options={[]}
          ></DropDown>

          <Button type="button">ایجاد فاکتور</Button>
        </div>
      </div>

      {/* Financial Reports Table */}
      <div className="bg-white rounded-lg  p-6">
        <CustomeDataTable
          urlRequest={`${BASE_URL + TICKET_LIST}`}
          columns={columns}
        />
      </div>
    </div>
  );
}
