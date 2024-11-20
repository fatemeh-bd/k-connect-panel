import { TableColumn } from "react-data-table-component";
import Table from "../../components/table/Table";
import Title from "../../components/typography/Title";
import { boxStyle, TicketStatusMapping } from "../../utils/enums";
import Button from "../../components/buttons/Button";
import { TicketType } from "./types";

const Tickets = () => {
  const exampleData: TicketType[] = [
    {
      id: 1,
      title: "سلام سلام",
      date: "1403/08/12",
      status: 1,
    },
    {
      id: 2,
      title: "بای بای",
      date: "1403/08/12",
      status: 2,
    },
  ];

  const mappedData = exampleData.map((ticket) => {
    const status = TicketStatusMapping[ticket.status] || {
      text: "نامشخص",
      color: "gray",
    };
    return {
      ...ticket,
      statusText: status.text,
      statusColor: status.color,
    };
  });

  const columns: TableColumn<{ [key: string]: any }>[] = [
    {
      name: "ردیف",
      selector: (row) => row.id,
      grow: 0,
      sortable: false,
    },
    {
      name: "عنوان",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "تاریخ",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "وضعیت",
      cell: (row) => {
        console.log(`Row Status:`, row);
        return (
          <span className={`text-${row.statusColor}`}>{row.statusText}</span>
        );
      },
      sortable: true,
    },
    {
      name: "عملیات",
      cell: () => (
        <div className="flex  justify-center items-center">
          <Button outline className="min-w-[120px] text-sm whitespace-nowrap">
            جزیات
          </Button>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div className="space-y-3">
      <Title>لیست تیک های ارسال شده</Title>
      <div className={boxStyle}>
        <Table columns={columns} data={mappedData} />
      </div>
    </div>
  );
};

export default Tickets;
