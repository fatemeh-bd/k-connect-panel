import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "../../components/buttons/Button";
import Modal from "../../components/modal/Modal";
import { boxStyle } from "../../utils/enums";
import AddTicket from "./_components/AddTicket";
import CustomeDataTable from "../../components/DataTable/DataTable";
import { BASE_URL } from "../../api/callApi";
import { TICKET_LIST } from "../../api/endpoints";

const Supports = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const columns = [
    {
      data: "id",
      name: "id",
      orderable: false,
      width: "",
      autoWidth: "",
      title: "عنوان",
      searchable: false,
      visible: false,
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
      data: "ticketStatus",
      name: "ticketStatus",
      orderable: true,
      width: "",
      autoWidth: "",
      title: "وضعیت",
      searchable: true,
      visible: true,
    },
    {
      data: "sectionName",
      name: "sectionName",
      orderable: true,
      width: "",
      autoWidth: "",
      title: "دپارتمان",
      searchable: true,
      visible: true,
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
    },

    {
      data: "id", // We will use this for the operations column
      name: "id",
      orderable: false,
      width: "150px",
      autoWidth: false,
      title: "عملیات",
      searchable: false,
      visible: true,
      // @ts-ignore
      render: (data: any, type: string, row: any, meta: any) => {
        // This will render a button in the "عملیات" column
        const divElementId = `btn-${row.id}`;
        return `<div id="${divElementId}"></div>`; // Create a div with an id to render the button inside
      },
    },
  ];
  return (
    <div className={`${boxStyle} overflow-auto`}>
      <Button
        Icon={PlusIcon}
        className="float-end"
        onClick={() => setOpenModal(true)}
      >
        تیکت جدید
      </Button>
      <div className={boxStyle}>
        <CustomeDataTable
          columns={columns}
          urlRequest={`${BASE_URL + TICKET_LIST}`}
          inputHeaders={[]}
          queryParameters={{ sort: "asc", filter: "active" }}
        />
      </div>
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
