import PieChart from "../../components/charts/PieChart";
import VerticalChart from "../../components/charts/VerticalChart";
import { boxStyle } from "../../utils/enums";
import Paragraph from "../../components/typography/Paragraph";
import InfoList from "./_components/InfoList";
import LastNotifications from "./_components/LastNotifications";
import { useLang } from "../../context/LangProvider";

export const exampleData = {
  labels: ["واریزی", "برداشت"],
  datasets: [
    {
      label: "گزارش مالی",
      data: [100, 55],
      backgroundColor: ["#0fbff560", "#28fdd25f"],
      borderColor: ["#55b7fc", "#36eb94"],
      borderWidth: 1,
    },
  ],
};

const labels = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const exampleData2 = {
  labels,
  datasets: [
    {
      label: "آمار فروش ماهانه",
      data: [10, 20, 45, 120, 23, 90, 67, 10, 20, 45, 265, 23],
      backgroundColor: "rgba(25, 136, 255, 0.776)",
    },
  ],
};

const Dashboard = () => {
  const { getTranslation } = useLang();

  return (
    <div className="space-y-4">
      <InfoList />
      <div className="grid grid-cols-12 gap-4">
        <div className="lg:col-span-7 col-span-12">
          <div className={boxStyle}>
            <Paragraph className="mb-4">
            {getTranslation("salesStats")}

                </Paragraph>
            <VerticalChart data={exampleData2} />
          </div>
        </div>
        <div className="lg:col-span-5 col-span-12">
          <div className={boxStyle}>
            <Paragraph className="mb-4">
              {getTranslation("financialReport")}
            </Paragraph>
            <PieChart data={exampleData} />
          </div>
        </div>
      </div>
      <LastNotifications />
    </div>
  );
};

export default Dashboard;
