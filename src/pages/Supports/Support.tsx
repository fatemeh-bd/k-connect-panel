import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "../../components/buttons/Button";
import Modal from "../../components/modal/Modal";
import { boxStyle, ColorType, TicketStatusMapping } from "../../utils/enums";
import AddTicket from "./_components/AddTicket";
import CustomeDataTable from "../../components/DataTable/DataTable";
import { BASE_URL } from "../../api/callApi";
import { TICKET_LIST } from "../../api/endpoints";
import Paragraph from "../../components/typography/Paragraph";
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";

const Supports = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0); // Add refresh key

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetch
  };

  const columns = [
    {
      data: "title",
      name: "title",
      orderable: true,
      width: "",
      autoWidth: "",
      title: "عنوان",
      searchable: true,
      visible: true,
      // @ts-ignore: Ignore TypeScript error for ReactDOM.render
      render: (data: any, type: any, row: ExampleType) => {
        return `<bold>${row.title}</bold>`;
      },
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
      // @ts-ignore

      createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
        const container = document.createElement("div");
        td.innerHTML = "";
        td.appendChild(container);
      
        const root = createRoot(container);
        const TicketStatusMappingArray = Object.values(TicketStatusMapping);

        const status = TicketStatusMappingArray.find(i=>i.text===cellData);
        console.log(status)
        root.render(
          <Paragraph
            type={status?.color ?? ColorType.BLACK} 
            className="!font-normal"
          >
            {status?.text || cellData} 
          </Paragraph>
        );
      },
      
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
      // renderModel:
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

      createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
        const container = document.createElement("div");
        td.innerHTML = "";
        td.appendChild(container);

        const root = createRoot(container);
        root.render(
          <Button onClick={() => navigate(`/support/${cellData}`)}>
            جزئیات
          </Button>
        );
      },
    },
  ];
  return (
    <div className={`${boxStyle} overflow-auto`}>
      <Button
        Icon={PlusIcon}
        className="float-end mb-4"
        onClick={() => setOpenModal(true)}
      >
        تیکت جدید
      </Button>
      <CustomeDataTable
        urlRequest={`${BASE_URL + TICKET_LIST}`}
        columns={columns}
        key={refreshKey}
      />
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        className="w-11/12 md:max-w-xl"
        title="ایجاد تیکت جدید"
      >
        <AddTicket setClose={setOpenModal} onAddTicket={handleRefresh} />
      </Modal>
    </div>
  );
};

export default Supports;
