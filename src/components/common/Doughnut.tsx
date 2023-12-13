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
import { DoughNutChartProps } from "../../@types/components/commonTypes";

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

const DoughnutChart = (props: DoughNutChartProps) => (
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

export default DoughnutChart;
