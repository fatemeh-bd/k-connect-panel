import React, { useRef } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.css";
import { useCookies } from "react-cookie";
import { useLang } from "../../context/LangProvider";
import { translations } from "../../context/translations";
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
  const { lang } = useLang();
  // DataTable options
  const tableOptions = {
    processing: true,
    serverSide: true,
    columns,
    paging: true, // Enables pagination
    responsive: true,
    pagingType: "full_numbers",
    language: {
      sProcessing: translations[lang].sProcessing,
      sZeroRecords: translations[lang].sZeroRecords,
      infoEmpty: translations[lang].infoEmpty,
      emptyTable: translations[lang].emptyTable,
      info: translations[lang].tableInfo,
      lengthMenu: translations[lang].lengthMenu,
      infoFiltered: translations[lang].infoFiltered,
      paginate: {
        last: translations[lang].paginateLast,
        first: translations[lang].paginateFirst,
        next: "❯",
        previous: "❮",
      },
      search: translations[lang].search,
      searchPlaceholder: translations[lang].search,
    },
    lengthMenu: [5, 10, 20, 50, 100, 200, 300, 500, 700, 1000], // Pagination options
    pageLength: 5,
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
