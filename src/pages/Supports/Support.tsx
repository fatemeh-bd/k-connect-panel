import { TableColumn } from "react-data-table-component";
import { boxStyle } from "../../utils/enums";
import Button from "../../components/buttons/Button";
import Table from "../../components/table/Table";
import { TicketType } from "./Ticket";

const Supports = () => {
    const exampleData: TicketType[] = [
        {
            Id: "3",
            IsSeen: false,
            Message: "سلام سرور جدید میخواستم",
            Title: "خرید سرور جدید",
            Status: "خوانده نشده",
            CreateDate: "3 دقیقه پیش",
            ModifyDate: "1 ثاینه پیش"
        },
        {
            Id: "4",
            IsSeen: false,
            Message: "سلام سرور جدید میخواستم",
            Title: "خرید سرور جدید",
            Status: "خوانده نشده",
            CreateDate: "3 دقیقه پیش",
            ModifyDate: "1 ثاینه پیش"

        },
        {
            Id: "6",
            IsSeen: false,
            Message: "سلام سرور جدید میخواستم",
            Title: "خرید سرور جدید",
            Status: "خوانده نشده",
            CreateDate: "3 دقیقه پیش",
            ModifyDate: "1 ثاینه پیش"

        },

    ];

    const columns: TableColumn<{ [key: string]: any }>[] = [
        {
            name: "شناسه تیکت",
            selector: (row) => row.Id,
            sortable: true,
        },
        {
            name: "عنوان",
            selector: (row) => row.Title,
            sortable: true,
        },
        {
            name: "پیام",
            selector: (row) => row.Message,
            sortable: true,
        },
        {
            name: "وضعیت",
            selector: (row) => row.Status,
            sortable: true,
        },
        {
            name: "تاریخ بروز رسانی",
            selector: (row) => row.ModifyDate,
            sortable: true,
        },
        {
            name: "تاریخ ایجاد",
            selector: (row) => row.CreateDate,
            sortable: true,
        },
        {
            name: "عملیات",
            cell: () => (
                <div className="flex justify-center items-center">
                    <Button className="min-w-[120px] text-sm whitespace-nowrap">
                        تغییر وضعیت
                    </Button>
                    <Button className="min-w-[120px] text-sm whitespace-nowrap">
                        تغییر وضعیت
                    </Button>
                </div>
            ),
            sortable: false,
        },
    ];

    return (
        <div className={`${boxStyle} overflow-auto`}>
            <Table columns={columns} data={exampleData} header={[]} />
        </div>
    );
};

export default Supports;
