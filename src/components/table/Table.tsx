import DataTable, { createTheme } from "react-data-table-component";
import Input from "../inputs/Input";
import { FC, useState } from "react";
import { TablePropsType } from "./types";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";
import Button from "../buttons/Button";

const Table: FC<TablePropsType> = ({ columns, data }) => {
  const [searchText, setSearchText] = useState("");
  const { theme } = useTheme();
  const baseTheme = {
    text: {
      primary: "var(--fontColor)",
      secondary: "#4B5563", // Default secondary color
    },
    background: {
      default: "transparent", // Default transparent background
    },
  };
  createTheme(theme, baseTheme);

  const paginationComponentOptions = {
    rowsPerPageText: "تعداد صفحات",
    rangeSeparatorText: "تا",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };
  const filteredData = data;
  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <Button className="mt-10" full type="button">
          رکورد
        </Button>
      </div>
      <div>

        <DataTable
          className="customTable"
          // title="مدیریت کاربران"
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={2}
          paginationRowsPerPageOptions={[2, 10, 20]}
          paginationServer
          responsive
          highlightOnHover
          paginationComponentOptions={paginationComponentOptions}
          sortIcon={<ChevronUpDownIcon className="size-4 mx-1" />}
          noDataComponent="دیتایی برای نمایش وجود ندارد"
          subHeader
          theme={theme}
          customStyles={{
            headCells: {
              style: {
                justifyContent: "center",
                textAlign: "center",
              },
            },

            cells: {
              style: {
                padding: "16px 4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
          }}
          subHeaderComponent={<Input
            type="text"
            label="جستجو در جدول"
            placeholder="جستجو در جدول..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-[300px] ml-auto" />} />
      </div>
    </>
  );
};

export default Table;
