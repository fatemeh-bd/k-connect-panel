import  { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { boxStyle } from "../../utils/enums";
import Button from "../../components/buttons/Button";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { UserType } from "./types";
import Input from "../../components/inputs/Input";

const UsersManagment = () => {
  // داده‌های نمونه
  const exampleData: UserType[] = [
    {
      userAvatar:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      firstName: "Fatemeh",
      lastName: "Ghasemi",
      phoneNumber: "09123456789",
      cityName: "تهران",
      isActiveLawyer: true,
      isConfirmDocument: true,
      userId: "1",
    },
    {
      userAvatar:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      firstName: "Ali",
      lastName: "Rezaei",
      phoneNumber: "09223334455",
      cityName: "مشهد",
      isActiveLawyer: false,
      isConfirmDocument: false,
      userId: "2",
    },
    {
      userAvatar:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      firstName: "Sara",
      lastName: "Ahmadi",
      phoneNumber: "09331234567",
      cityName: "شیراز",
      isActiveLawyer: true,
      isConfirmDocument: true,
      userId: "3",
    },
  ];

  // state برای جستجو
  const [searchText, setSearchText] = useState("");

  // فیلتر کردن داده‌ها بر اساس جستجو
  const filteredData = exampleData.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.phoneNumber.includes(searchText) ||
      item.cityName.toLowerCase().includes(searchText)
  );

  // ستون‌های جدول
  const columns: TableColumn<UserType>[] = [
    {
      name: "پروفایل",
      cell: (row) => (
        <img
          className="rounded-full size-12"
          src={row.userAvatar}
          alt="Profile"
          width="50"
          height="50"
        />
      ),
      sortable: false,
    },
    {
      name: "نام",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "نام خانوادگی",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "شماره موبایل",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "شهر",
      selector: (row) => row.cityName,
      sortable: true,
    },
    {
      name: "وضعیت پروفایل",
      cell: (row) => (row.isActiveLawyer ? "خوب" : "بد"),
      sortable: true,
    },
    {
      name: "وضعیت مدارک",
      cell: (row) => (row.isConfirmDocument ? "تایید شده" : "تایید نشده"),
      sortable: true,
    },
    {
      name: "عملیات",
      cell: () => (
        <div className="flex justify-center items-center">
          <Button className="min-w-[120px] text-sm cursor-pointer font-medium items-center justify-center rounded-lg bg-primary text-white p-2 hover:opacity-80 whitespace-nowrap">
            تغییر وضعیت
          </Button>
        </div>
      ),
      sortable: false,
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: 'تعداد صفحات',
    rangeSeparatorText: 'تا',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };
  return (
    <div className={`${boxStyle} overflow-auto`}>
      <DataTable
        className="customTable"
        title="مدیریت کاربران"
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={2}
        paginationRowsPerPageOptions={[2, 10, 20]}
        paginationServer
        responsive
        highlightOnHover
        paginationComponentOptions={paginationComponentOptions}
        sortIcon={<ChevronUpDownIcon className="size-4 mx-1" />}
        noDataComponent="دیتایی برای نمایش وجود ندارد"
        subHeader
        customStyles={{
          headCells: {
            style: {
              justifyContent: "center",
              textAlign: "center",
            },
          },
          cells: {
            style: {
              padding: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
        }}
        subHeaderComponent={
          <Input
            type="text"
            label="جستجو در جدول"
            placeholder="جستجو در جدول..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-[300px]"
          />
        }
      />
    </div>
  );
};

export default UsersManagment;
