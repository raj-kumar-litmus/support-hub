import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
// import { OpmData, Options } from '../@types/todo';
import useScreenSize from "../hooks/useScreenSize";
import React, { useState } from "react";

// interface Props {
//   options: Options;
//   data: OpmData;
// }
interface Props {
  options: ChartOptions<"line"> | any;
  data: ChartData<"line">;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LineChart({ options, data }: Props) {
  const [rotate, setRotate] = useState<boolean>(false);
  const { width } = useScreenSize();

  return (
    <div
      className={`${
        rotate ? "rotate-90 mt-[200px]" : "relative h-screen w-screen"
      }`}
    >
      {width < 700 && (
        <button
          className="w-[105%] text-center mr-[50px]"
          onClick={() => setRotate(!rotate)}
        >
          {!rotate ? "Rotate" : "UnRotate"}
        </button>
      )}
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChart;
