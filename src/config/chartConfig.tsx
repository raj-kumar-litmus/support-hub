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
import { SESSIONS_CHART } from "../constants/appConstants";
import { externalTooltipHandler } from "../components/utils/Utils";

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
      display: true,
      position: "bottom",
      align: "start",
      maxWidth: 100,
      labels: {
        padding: 16,
        boxWidth: 32,
        generateLabels: (chart) => {
          const data = chart.data;
          if (data.datasets.length) {
            return data.datasets.map((dataset) => ({
              text: dataset.label,
              fillStyle: "#30343B",
              fontColor: dataset.backgroundColor,
              lineWidth: SESSIONS_CHART.LEGEND_LINE_WIDTH,
              strokeStyle: dataset.backgroundColor,
            }));
          }
        },
      },
    },
    datalabels: {
      display: true,
      formatter: (_, context) =>
        context.chart.data.dataset?.[0]?.data?.[context.dataIndex],
      align: "top",
      anchor: "end",
      color: "white",
      font: {
        size: "12",
      },
    },
    tooltip: {
      enabled: false,
      external: (_) => externalTooltipHandler(_, "sessions"),
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
        stepSize: SESSIONS_CHART.STEP_SIZE,
        count: SESSIONS_CHART.TICK_COUNT,
      },
    },
  },
  datasets: {
    bar: {
      barPercentage: SESSIONS_CHART.BAR_PERCENT,
      maxBarThickness: SESSIONS_CHART.MAX_BAR_THICKNESS,
      borderRadius: SESSIONS_CHART.BAR_BORDER_RADIUS,
      categoryPercentage: SESSIONS_CHART.CATEGORY_PERCENT,
    },
  },
};
