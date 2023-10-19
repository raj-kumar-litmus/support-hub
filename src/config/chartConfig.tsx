import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Filler,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  CHART,
  SESSIONS_CHART,
  TOTAL_SESSIONS_PER_MIN_PRIMARY,
  TOTAL_SESSIONS_PER_MIN,
  TOTAL_ORDERS_PER_MIN,
} from "../constants/appConstants";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Filler,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  ChartDataLabels,
  Colors
);

export const BAR_CHART_OPTIONS: Chart.ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "start",
    },
    title: {
      display: true,
      align: "start",
      position: "top",
      color: "#F2F2F2",
      font: {
        size: CHART.TITLE_FONT_SIZE,
      },
      padding: { top: 10, bottom: 15 },
    },
    subtitle: {
      display: true,
      text: TOTAL_SESSIONS_PER_MIN,
      align: "center",
      position: "bottom",
      color: "#FAF9F6",
      font: {
        size: CHART.SUBTITLE_FONT_SIZE,
      },
    },
    datalabels: {
      display: false,
      rotation: CHART.ROTATION_0,
      font: {
        size: CHART.DATALABEL_FONT_SIZE,
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
        color: "#383F47",
      },
      border: {
        display: false,
      },
      ticks: {
        display: false,
        stepSize: SESSIONS_CHART.STEP_SIZE,
        count: SESSIONS_CHART.TICK_COUNT,
      },
    },
  },
  datasets: {
    bar: {
      categoryPercentage: SESSIONS_CHART.CATEGORY_PERCENT,
      barPercentage: SESSIONS_CHART.BAR_PERCENT,
      maxBarThickness: SESSIONS_CHART.MAX_BAR_THICKNESS,
      borderRadius: SESSIONS_CHART.BAR_BORDER_RADIUS,
    },
  },
};
