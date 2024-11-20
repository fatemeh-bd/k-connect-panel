import { TableColumn } from "react-data-table-component";
import { boxStyle, ColorType } from "../../utils/enums";
import Button from "../../components/buttons/Button";
import Table from "../../components/table/Table";
import { TicketType } from "./Ticket";
import Title from "../../components/typography/Title";
import { PlusIcon } from "@heroicons/react/24/outline";

const Supports = () => {
  const exampleData: TicketType[] = [
    {
      Id: "3",
      IsSeen: false,
      Message: "سلام سرور جدید میخواستم",
      Title: "خرید سرور جدید",
      Status: "خوانده نشده",
      CreateDate: "3 دقیقه پیش",
      ModifyDate: "1 ثاینه پیش",
    },
    {
      Id: "4",
      IsSeen: false,
      Message: "سلام سرور جدید میخواستم",
      Title: "خرید سرور جدید",
      Status: "خوانده نشده",
      CreateDate: "3 دقیقه پیش",
      ModifyDate: "1 ثاینه پیش",
    },
    {
      Id: "6",
      IsSeen: false,
      Message: "سلام سرور جدید میخواستم",
      Title: "خرید سرور جدید",
      Status: "خوانده نشده",
      CreateDate: "3 دقیقه پیش",
      ModifyDate: "1 ثاینه پیش",
    },
  ];

  const columns: TableColumn<{ [key: string]: any }>[] = [
    {
      name: "شناسه تیکت",
      selector: (row) => row.Id,
      sortable: true,
      grow: 0,
    },
    {
      name: "عنوان",
      selector: (row) => row.Title,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "پیام",
      selector: (row) => row.Message,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "وضعیت",
      selector: (row) => row.Status,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "تاریخ بروز رسانی",
      selector: (row) => row.ModifyDate,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "تاریخ ایجاد",
      selector: (row) => row.CreateDate,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "عملیات",
      cell: () => (
        <div className="flex justify-center items-center gap-2">
          <Button outline className="min-w-[120px] text-sm whitespace-nowrap">
            تغییر وضعیت
          </Button>
          <Button className="min-w-[120px] text-sm whitespace-nowrap">
            تغییر وضعیت
          </Button>
        </div>
      ),
      sortable: false,
      grow: 1,
    },
  ];

  return (
    <div className={`${boxStyle} overflow-auto`}>
      <Title>لیست تیک های ارسال شده</Title>
      <Button
        Icon={PlusIcon}
        themeType={ColorType.SUCCESS}
        className="float-end"
      >
        تیکت جدید
      </Button>
      <Table columns={columns} data={exampleData} header={[]} />
    </div>
  );
};

export default Supports;
