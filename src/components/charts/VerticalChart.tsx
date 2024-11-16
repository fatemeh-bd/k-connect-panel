import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { chartOptions } from "./globals";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VerticalChart = ({
  data,
}: {
  data: { labels: string[]; datasets: any[] };
}) => {
  return (
    <div className="w-full h-[350px]">
      <Bar
        options={{
          ...chartOptions,
          scales: {
            x: {
              ticks: {
                font: {
                  family: "IRANSansWeb",
                },
              },
            },
            y: {
              ticks: {
                font: {
                  family: "IRANSansWeb",
                },
              },
            },
          },
        }}
        data={data}
      />
    </div>
  );
};

export default VerticalChart;
