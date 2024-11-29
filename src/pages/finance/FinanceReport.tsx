import CustomeDataTable from "../../components/DataTable/DataTable";
import { BASE_URL } from "../../api/callApi";
import { WalletTransaction } from "../../api/endpoints";

export default function Financial() {
  const columns = [
    {
      data: "id",
      name: "id",
      orderable: true,
      width: "",
      autoWidth: "",
      title: "شناسه ",
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
      data: "price",
      name: "price",
      orderable: true,
      width: "",
      autoWidth: "",
      title: "مبلغ ",
      searchable: true,
      visible: true,
    },
    {
      data: "description",
      name: "description",
      orderable: false,
      width: "",
      autoWidth: "",
      title: "توضحیات",
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
      data: "preOperationInventory",
      name: "preOperationInventory",
      orderable: false,
      width: "",
      autoWidth: "",
      title: "موجودی قبل عملیات	",
      searchable: true,
      visible: true,
      // renderModel:
    },
    {
      data: "inventoryAfterOperation",
      name: "inventoryAfterOperation",
      orderable: false,
      width: "",
      autoWidth: "",
      title: "موجودی بعد عملیات",
      searchable: true,
      visible: true,
      // renderModel:
    },
  ];
  return (
    <div className="space-y-2 light:bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg  p-6">
        <CustomeDataTable
          urlRequest={`${BASE_URL + WalletTransaction}`}
          columns={columns}
        />
      </div>
    </div>
  );
}
