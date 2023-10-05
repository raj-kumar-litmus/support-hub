import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { TOTAL_SESSIONS_PER_MIN_PRIMARY } from "../constants/appConstants";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export const BAR_CHART_OPTIONS: Chart.ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: TOTAL_SESSIONS_PER_MIN_PRIMARY,
      align: "center",
      position: "bottom",
      font: {
        size: 10,
      },
    },
    datalabels: {
      align: "center",
      color: "white",
      rotation: 0,
      font: {
        size: 10,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
      border: {
        display: false,
      },
      ticks: {
        display: false,
        // stepSize: 5000,
        count: 5,
      },
    },
  },
  datasets: {
    bar: {
      barPercentage: 0.7,
      maxBarThickness: 40,
      borderRadius: 6,
    },
  },
};
