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
import {
  BAR_BORDER_RADIUS,
  BAR_PERCENT,
  CHART_DATALABEL_FONT_SIZE,
  CHART_TITLE_FONT_SIZE,
  MAX_BAR_THICKNESS,
  ROTATION_0,
  STEP_SIZE,
  TICK_COUNT,
  TOTAL_SESSIONS_PER_MIN_PRIMARY,
} from "../constants/appConstants";

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
        size: CHART_TITLE_FONT_SIZE,
      },
    },
    datalabels: {
      align: "center",
      color: "white",
      rotation: ROTATION_0,
      font: {
        size: CHART_DATALABEL_FONT_SIZE,
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
        stepSize: STEP_SIZE,
        count: TICK_COUNT,
      },
    },
  },
  datasets: {
    bar: {
      barPercentage: BAR_PERCENT,
      maxBarThickness: MAX_BAR_THICKNESS,
      borderRadius: BAR_BORDER_RADIUS,
    },
  },
};
