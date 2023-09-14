import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: [1, 2, 3, 4, 5, 6, 7, 8, 90, 10, 11, 12],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: [10, 20, 33, 40, 5, 60, 30, 87, 90, 101, 10, 120],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function Chart() {
  const [rotate, setRotate] = useState(false);

  return (
    <div className={rotate ? "rotate-90 mt-[200px]" : ""}>
      <div className="w-200px text-center">
        <button className="mr-[50px]" onClick={() => setRotate(true)}>
          Rotate
        </button>
        <button className="mr-[50px]" onClick={() => setRotate(false)}>
          UnRotate
        </button>
      </div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default Chart;
