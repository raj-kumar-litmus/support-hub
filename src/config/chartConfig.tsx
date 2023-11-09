import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { externalTooltipHandler } from "../components/utils/Utils";
import { SESSIONS_CHART } from "../constants/appConstants";

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
      color: "black",
      font: {
        size: "12",
      },
    },
    tooltip: {
      enabled: false,
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

export const ORDER_REPORT_PIE_CHART_OPTIONS = {
  maintainAspectRatio: false,
  responsive: false,
  plugins: {
    legend: {
      display: true,
      position: "right",
      align: "start",
      labels: {
        usePointStyle: true,
        font: {
          size: 11
        },
        color: '#FFFFFF'
      },
    },
    datalabels: {
      formatter: (value, ctx) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map(data => {
          sum += data;
        });
        let _perc = (value * 100 / sum).toFixed(1);
        let percentage = Number(_perc) > 5 ? `${_perc}%` : "";
        return percentage;
      },
      font: { weight: 700 },
      color: "#161A1D",

    },
    tooltip: {
      enabled: false,
      external: (context) => externalTooltipHandler(context, "reportPieChart", true),
    }
  },
};

export const HOURLY_ORDER_TREND_LINE_CHART_OPTION: Chart.ChartOptions = {
  responsiveness: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "center",
      labels: {
        usePointStyle: true,
        font: {
          size: 11
        },
        color: '#FFFFFF'
      },
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: (context) => externalTooltipHandler(context, "reportLineChart", true),
    },
  }
}
