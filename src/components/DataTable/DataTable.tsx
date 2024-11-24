import React, { useRef } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.css";
import { useCookies } from "react-cookie";
DataTable.use(DT);

// Define types for props
interface InputHeader {
  ParameterName: string;
  Id: string;
}

interface QueryParameters {
  [key: string]: string | number | boolean;
}

interface CustomeDataTableProps {
  inputHeaders?: InputHeader[];
  queryParameters?: QueryParameters;
  urlRequest: string;
  columns: any;
}

const CustomeDataTable: React.FC<CustomeDataTableProps> = ({
  inputHeaders = [],
  // queryParameters = {},
  urlRequest,
  columns = [],
}) => {
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [cookies] = useCookies(["access_token"]);

  // DataTable options
  const tableOptions = {
    processing: true,
    serverSide: true,
    columns,
    paging: true, // Enables pagination
    responsive: true,
    pagingType: "full_numbers",
    language: {
      sProcessing: "لطفا منتطر بمانید ...",
      sZeroRecords: "دیتایی برای نمایش وجود ندارد",
      infoEmpty: "دیتایی برای نمایش وجود ندارد",
      emptyTable: "دیتایی برای نمایش وجود ندارد",
      info: "نمایش _START_ از _END_ از _TOTAL_ رکورد",
      lengthMenu: "نمایش _MENU_ رکورد",
      infoFiltered: " - فیلتر از بین  _MAX_ رکورد",
      paginate: {
        last: "آخرین",
        first: "اولین",
        next: "❯",
        previous: "❮",
      },
      search: "جستجو :  ",
      searchPlaceholder: "جستجو",
    },
    lengthMenu: [10, 20, 50, 100, 150, 200, 300, 500, 700, 1000], // Pagination options
    pageLength: 10, 
  };
  const ajaxConfig = {
    url: `${urlRequest}`,
    type: "POST",
    contentType: "application/json",
    beforeSend: (xhr: XMLHttpRequest) => {
      // Add JWT token to the Authorization header
      xhr.setRequestHeader("Authorization", `Bearer ${cookies.access_token}`);
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    },
    data: (params: Record<string, any>) => {
      // Collect dynamic query parameters based on input field values
      const updatedParams = inputHeaders.reduce((acc, header) => {
        const inputRef = inputRefs.current[header.Id];
        if (inputRef && inputRef.value) {
          // Add the input value directly to the query parameters
          acc[header.ParameterName] = inputRef.value;
        }
        return acc;
      }, {} as Record<string, string>);

      // Return the updated params with the custom dynamic query parameters
      return JSON.stringify({
        ...params,
        ...updatedParams, // Merge the dynamically collected query params
      });
    },
  };

  return (
    <DataTable ajax={ajaxConfig} className="display" options={tableOptions} />
  );
};

export default CustomeDataTable;
