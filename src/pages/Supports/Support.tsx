import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import Button from "../../components/buttons/Button";
import Modal from "../../components/modal/Modal";
import Table from "../../components/table/Table";
import { boxStyle } from "../../utils/enums";
import AddTicket, { ApiResponse, Option } from "./_components/AddTicket";
import { TicketType } from "./types";
import ButtonLink from "../../components/buttons/ButtonLink";
import { useQuery } from "react-query";
import { postMethod } from "../../api/callApi";
import { SUPPORT_SECTIONS_LIST, TICKET_LIST } from "../../api/endpoints";

const Supports = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
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
        <ButtonLink
          outline
          href={"/support/1"}
          className="min-w-[120px] text-sm whitespace-nowrap"
        >
          مشاهده پیام
        </ButtonLink>
      ),
      sortable: false,
      grow: 1,
    },
  ];

  const { data, isLoading } = useQuery(
    "support-list",
    () =>
      postMethod(TICKET_LIST, {}).then((res) => {
        if (res?.isSuccess) {
          return res.data;
        }
        return [];
      }),
    {}
  );
  return (
    <div className={`${boxStyle} overflow-auto`}>
   
      <Button
        Icon={PlusIcon}
        className="float-end"
        onClick={() => setOpenModal(true)}
      >
        تیکت جدید
      </Button>
      <Table columns={columns} data={exampleData} header={[]} />
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        className="w-11/12 md:max-w-xl"
        title="ایجاد تیکت جدید"
      >
        <AddTicket setClose={setOpenModal} />
      </Modal>
    </div>
  );
};

export default Supports;
