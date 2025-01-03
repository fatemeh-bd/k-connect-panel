import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { chartOptions } from "./globals";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({
  data,
}: {
  data: { labels: string[]; datasets: any[] };
}) => {
 

  return (
    <div className="w-full sm:h-[350px] h-[280px]">
      <Pie
        data={data}
        options={chartOptions}
      />
    </div>
  );
};

export default PieChart;
