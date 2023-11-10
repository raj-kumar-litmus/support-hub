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
  SESSIONS_CHART,
  TOTAL_ORDERS_PER_MINUTE,
} from "../constants/appConstants";
import { externalTooltipHandler } from "../components/utils/Utils";
import {
  SESSIONS_CHART,
  TOTAL_ORDERS_PER_MINUTE,
} from "../constants/appConstants";
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
      display: false,
      display: false,
      formatter: (_, context) =>
        context.chart.data.dataset?.[0]?.data?.[context.dataIndex],
      color: "black",
      font: {
        size: "12",
      },
    },
    tooltip: {
      enabled: false,
      external: (_) => externalTooltipHandler(_, "session"),
      mode: "index",
      external: (_) => externalTooltipHandler(_, "session"),
      mode: "index",
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

export const OPM_BAR_CHART_OPTIONS: Chart.ChartOptions = {
  ...BAR_CHART_OPTIONS,
  plugins: {
    ...BAR_CHART_OPTIONS.plugins,
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: (_) => externalTooltipHandler(_, "opm_bar"),
    },
    title: {
      display: true,
      color: "#FAF9F6",
      text: TOTAL_ORDERS_PER_MINUTE,
      position: "bottom",
      font: {
        size: "12",
      },
      padding: 20,
    },
  },
  scales: {
    ...BAR_CHART_OPTIONS.scales,
    y: {
      ...BAR_CHART_OPTIONS.scales.y,
      ticks: {
        ...BAR_CHART_OPTIONS.scales.y.ticks,
        stepSize: 100,
      },
    },
  },
};
