import { boxStyle, ColorType } from "../../utils/enums";
import Button from "../../components/buttons/Button";
import {
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import AddUser from "./_components/AddUser";
import Modal from "../../components/modal/Modal";
import CustomeDataTable from "../../components/DataTable/DataTable";
import { BASE_URL } from "../../api/callApi";
import { CLIENT_LIST } from "../../api/endpoints";
import { createRoot } from "react-dom/client";
import Paragraph from "../../components/typography/Paragraph";
import { QrCodeIcon } from "@heroicons/react/20/solid";
import QRCodeGenerator from "../../components/QR/QRCodeGenerator";
import IncreaseVolume from "./_components/IncreaseVolume";
import RemoveClient from "./_components/RemoveClient";
import DataUsage from "../../components/dataUsage/DataUsage";
import { LangProvider, useLang } from "../../context/LangProvider";
import { translations } from "../../context/translations";
export interface ClientDataType {
  userName: string;
  planName: string;
  id: number;
}
const UsersManagment = () => {
  const [addUserOpenModal, setAddUserModal] = useState<boolean>(false);
  const [connectionModal, setConnectionModal] = useState<boolean>(false);
  const [connectionSubModal, setConnectionSubModal] = useState<boolean>(false);
  const [increaseVolumeModal, setIncreaseVolumeModal] =
    useState<boolean>(false);
  const [removeClientModal, setRemoveClientModal] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0); // Add refresh key
  const [getClientSelected, setGetClientSelected] = useState<ClientDataType>({
    userName: "",
    planName: "",
    id: 0,
  });
  const { lang } = useLang();

  const [getConnection, setConnection] = useState<string[]>(["sdsd", "sdsd"]);
  const [getSubConnection, setSubConnection] = useState<string>("");
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  const columns = [
    {
      data: "userName",
      name: "userName",
      orderable: true,
      width: "",
      autoWidth: "",
      title: translations[lang].userName,
      searchable: true,
      visible: true,
      // @ts-ignore: Ignore TypeScript error for ReactDOM.render
      render: (data: any, type: any, row: ExampleType) => {
        return `<bold>${row.userName}</bold>`;
      },
    },
    {
      data: "phoneNumber",
      name: "phoneNumber",
      orderable: true,
      width: "",
      autoWidth: "",
      title: translations[lang].phoneNumber,
      searchable: true,
      visible: true,
      // @ts-ignore

      createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
        const container = document.createElement("div");
        td.innerHTML = "";
        td.appendChild(container);
        const root = createRoot(container);
        root.render(
          <Paragraph
            type={cellData?.color ?? ColorType.BLACK}
            className="!font-normal"
          >
            {cellData}
          </Paragraph>
        );
      },
    },
    {
      data: "planName",
      name: "planName",
      orderable: true,
      width: "",
      autoWidth: "",
      title: translations[lang].selectedPlan,
      searchable: true,
      visible: true,
      // @ts-ignore: Ignore TypeScript error for ReactDOM.render
      render: (data: any, type: any, row: ExampleType) => {
        return `<bold>${row.planName}</bold>`;
      },
    },
    {
      data: "useage",
      name: "useage",
      orderable: true,
      width: "",
      autoWidth: "",
      title: translations[lang].usedVolume,
      searchable: true,
      visible: true,
      // @ts-ignore

      createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
        const container = document.createElement("div");
        td.innerHTML = "";
        td.appendChild(container);

        const root = createRoot(container);

        console.log(status);
        root.render(
          <div className="p-4">
            <LangProvider>
              <DataUsage
                currentBytes={rowData.consumptionVolume}
                totalBytes={rowData.totalVolume}
              />
            </LangProvider>
          </div>
        );
      },
    },
    {
      data: "createAt",
      name: "createAt",
      orderable: true,
      width: "",
      autoWidth: "",
      title: translations[lang].createDate,
      searchable: true,
      visible: true,
    },
    {
      data: "id", // We will use this for the operations column
      name: "id",
      orderable: false,
      width: "470px",
      autoWidth: false,
      title: translations[lang].tableOperations,
      searchable: false,
      visible: true,
      // @ts-ignore

      createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
        const container = document.createElement("div");
        td.innerHTML = "";
        td.appendChild(container);

        const root = createRoot(container);
        root.render(
          <div className="flex gap-1 justify-center [&>button]:whitespace-nowrap ">
            <Button
              Icon={QrCodeIcon}
              onClick={() => {
                setConnectionModal(true);
                console.log(
                  "%csrcpagesrsManagmentUsersManagment.tsx:150 rowData.connections",
                  "color: #007acc;",
                  rowData.connections
                );
                setConnection(
                  rowData.connections.map(
                    (connection: string) => connection.link
                  )
                );
              }}
            >
              {translations[lang].connectionCode}
            </Button>
            <Button
              Icon={QrCodeIcon}
              onClick={() => {
                setConnectionSubModal(true);
                console.log(
                  "%csrcpagessersManagmentUsersManagment.tsx:159 setSubConnection",
                  "color: #007acc;",
                  cellData
                );
                setSubConnection(rowData.subLink);
              }}
            >
              {translations[lang].subscription}
            </Button>
            <Button
              Icon={PlusCircleIcon}
              onClick={() => {
                setIncreaseVolumeModal(true);
                setGetClientSelected(rowData);
              }}
            >
              {translations[lang].volume}
            </Button>
            <Button
              themeType={ColorType.ERROR}
              Icon={TrashIcon}
              onClick={() => {
                setRemoveClientModal(true);
                setGetClientSelected(rowData);
              }}
            >
              {translations[lang].delete}
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className={`${boxStyle} overflow-auto userTable`}>
      <Button
        Icon={PlusIcon}
        className=" mb-3"
        onClick={() => setAddUserModal(true)}
      >
      {translations[lang].addUser}
      </Button>
      <CustomeDataTable
        urlRequest={`${BASE_URL + CLIENT_LIST}`}
        columns={columns}
        key={refreshKey}
      />
      <Modal
        isOpen={connectionModal}
        onClose={() => setConnectionModal(false)}
        title="کد اتصال"
        className="md:min-w-[450px] min-w-[90%] overflow-scroll"
      >
        <QRCodeGenerator texts={getConnection}></QRCodeGenerator>
      </Modal>
      <Modal
        isOpen={connectionSubModal}
        onClose={() => setConnectionSubModal(false)}
        title="سابسکریپشن"
        className="md:min-w-[450px] min-w-[90%]"
      >
        <QRCodeGenerator texts={[getSubConnection]}></QRCodeGenerator>
      </Modal>
      <Modal
        isOpen={increaseVolumeModal}
        onClose={() => setIncreaseVolumeModal(false)}
        title="افزایش  حجم"
        className="md:min-w-[450px] min-w-[90%]"
      >
        <IncreaseVolume
          clientData={getClientSelected}
          onAddClient={handleRefresh}
          setClose={setIncreaseVolumeModal}
        />
      </Modal>
      <Modal
        isOpen={removeClientModal}
        onClose={() => setRemoveClientModal(false)}
        title="حذف"
        className="md:min-w-[450px] min-w-[90%]"
      >
        <RemoveClient
          clientData={getClientSelected}
          onAddClient={handleRefresh}
          setClose={setRemoveClientModal}
        />
      </Modal>
      <Modal
        isOpen={addUserOpenModal}
        onClose={() => setAddUserModal(false)}
        title={translations[lang].addUser}
        className="md:min-w-[450px] min-w-[90%] h-[3]"
      >
        <AddUser onAddClient={handleRefresh} setClose={setAddUserModal} />
      </Modal>
    </div>
  );
};

export default UsersManagment;
