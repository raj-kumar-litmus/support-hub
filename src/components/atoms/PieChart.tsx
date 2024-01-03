import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { FC } from "react";
import { Pie } from "react-chartjs-2";
import useScreenSize from "../../hooks/useScreenSize";
import { PieChartProps } from "../../@types/components/commonTypes";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: FC<PieChartProps> = (props) => {
  const screenWidth = useScreenSize().width;

  return (
    <Pie
      data={props.data}
      options={props.options}
      height={
        props.xsHeight && screenWidth < 700 ? props.xsHeight : props.height
      }
      width={props.xsWidth && screenWidth < 700 ? props.xsWidth : props.width}
    />
  );
};

export default PieChart;
