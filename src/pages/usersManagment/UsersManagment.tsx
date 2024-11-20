import { TableColumn } from "react-data-table-component";
import { boxStyle, ColorType } from "../../utils/enums";
import Button from "../../components/buttons/Button";
import { UserType } from "./types";
import Table from "../../components/table/Table";
import { PlusIcon } from "@heroicons/react/24/outline";

const UsersManagment = () => {
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

  const columns: TableColumn<{ [key: string]: any }>[] = [
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
      grow: 0,
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
          <Button outline className="min-w-[120px] text-sm whitespace-nowrap">
            تغییر وضعیت
          </Button>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div className={`${boxStyle} overflow-auto`}>
      <Button
        Icon={PlusIcon}
        themeType={ColorType.SUCCESS}
        className="float-end"
      >
        افزودن کاربر
      </Button>
      <Table columns={columns} data={exampleData} header={[]} />
    </div>
  );
};

export default UsersManagment;
