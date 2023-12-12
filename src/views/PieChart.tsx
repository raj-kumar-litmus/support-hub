import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { PieChartProps } from "../../@types/components/commonTypes";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props: PieChartProps) => (
  <div className={props.containerClassName}>
    <Pie
      className={props.chartClassName}
      options={props.options}
      data={props.data}
      plugins={props.plugins}
    />
  </div>
);

export default PieChart;
