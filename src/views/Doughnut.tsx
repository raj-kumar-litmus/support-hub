import type { ChartData, ChartOptions } from "chart.js";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface Props {
  options: ChartOptions<"doughnut"> | any;
  data: ChartData<"doughnut">;
  containerClassName?: string;
  chartClassName?: string;
  title?: string;
  isFullScreen?: boolean;
  defaultClasses?: boolean;
  plugins?: any;
  showIndicator?: boolean;
}

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const DoughnutChart = (props: Props) => {
  return (
    <div
      className={`${props.containerClassName} cursor-pointer`}
      onClick={() => alert("Hi there")}
    >
      <Doughnut
        className={props.chartClassName}
        options={props.options}
        data={props.data}
        plugins={props.plugins}
      />
    </div>
  );
};

export default DoughnutChart;
