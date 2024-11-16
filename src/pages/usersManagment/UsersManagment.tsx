import { boxStyle } from "../../utils/enums";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Button from "../../components/buttons/Button";
import ReactDOM from "react-dom";
DataTable.use(DT);

const UsersManagment = () => {
  const columns = [
    {
      data: "userAvatar",
      title: "پروفایل",
      orderable: false,
      searchable: false,
      render: (data, type, row) => {
        return `<img loading="lazy" class="rounded-full size-12 mx-auto" src=${row.userAvatar} width="50" height="50" alt="Profile" />`;
      },
    },
    { data: "firstName", title: "نام", orderable: false },
    { data: "lastName", title: "نام خانوادگی", orderable: true },
    { data: "phoneNumber", title: "شماره موبایل", orderable: true },
    { data: "cityName", title: "شهر", orderable: true },
    {
      data: "isActiveLawyer",
      title: "وضعیت پروفایل",
      orderable: false,
      render: (data) => {
        return "خوب"
         
      },
    },
    {
      data: "userId",
      title: "تغییر وضعیت پروفایل",
      orderable: false,
      render: (data, type, row) => {
        return `<button type="button" class="btn btn-success me-1" onclick="handleToggleActive('${row.userId}')">تغییر وضعیت</button>`;
      },
    },
    {
      data: "isConfirmDocument",
      title: "وضعیت مدارک",
      render: (data) => (data ? "تایید شده" : "تایید نشده"),
    },
    {
      data: "userId",
      title: "عملیات",
      createdCell: (td, cellData, rowData) => {
        const container = document.createElement("div");
        td.appendChild(container);

        ReactDOM.render(
          <Button>
            جزئیات
          </Button>,
          container
        );
      },
    },
  ];

  const exampleData = [
    {
      userAvatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      firstName: "Fatemeh",
      lastName: "Ghasemi",
      phoneNumber: "09123456789",
      cityName: "تهران",
      isActiveLawyer: true,
      isConfirmDocument: true,
      userId: "1",
    },
    {
      userAvatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      firstName: "Ali",
      lastName: "Rezaei",
      phoneNumber: "09223334455",
      cityName: "مشهد",
      isActiveLawyer: false,
      isConfirmDocument: false,
      userId: "2",
    },
    {
      userAvatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      firstName: "Sara",
      lastName: "Ahmadi",
      phoneNumber: "09331234567",
      cityName: "شیراز",
      isActiveLawyer: true,
      isConfirmDocument: true,
      userId: "3",
    },
  ];

  const options = {
    data: exampleData,
    columns,
    lengthMenu: [5, 10, 20],
    responsive: true,
    pagingType: "full_numbers",
    language: {
      sZeroRecords: "دیتایی برای نمایش وجود ندارد",
      infoEmpty: "دیتایی برای نمایش وجود ندارد",
      emptyTable: "دیتایی برای نمایش وجود ندارد",
      info: "نمایش _START_ از _END_ از _TOTAL_ رکورد",
      lengthMenu: "نمایش _MENU_ رکورد",
      paginate: {
        last: "اخرین",
        first: "اولین",
        next: "بعدی",
        previous: "قبلی",
      },
      search: "جستجو :",
      searchPlaceholder: "جستجو",
    },
  };

  return (
    <div className={boxStyle}>
      <div className="container">
        <DataTable {...options} className="display"/>
      </div>
    </div>
  );
};

export default UsersManagment;
