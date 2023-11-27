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
  SESSIONS_CHART_DEFAULT,
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

export const BAR_CHART_OPTIONS: Chart.ChartOptions = (
  showDataLabels = false,
) => ({
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
              lineWidth: SESSIONS_CHART_DEFAULT.LEGEND_LINE_WIDTH,
              strokeStyle: dataset.backgroundColor,
            }));
          }
        },
      },
    },
    datalabels: {
      display: showDataLabels,
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
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
      },
      border: {
        display: false,
      },
      ticks: {
        display: true,
        stepSize: SESSIONS_CHART_DEFAULT.STEP_SIZE,
        count: SESSIONS_CHART_DEFAULT.TICK_COUNT,
        callback: function (value) {
          if (value >= 1000) {
            return value / 1000 + "K";
          } else {
            return value;
          }
        },
      },
    },
  },
  datasets: {
    bar: {
      barPercentage: SESSIONS_CHART_DEFAULT.BAR_PERCENT,
      maxBarThickness: SESSIONS_CHART_DEFAULT.MAX_BAR_THICKNESS,
      borderRadius: SESSIONS_CHART_DEFAULT.BAR_BORDER_RADIUS,
      categoryPercentage: SESSIONS_CHART_DEFAULT.CATEGORY_PERCENT,
    },
  },
});

//OPM Charts
export const OPM_BAR_CHART_OPTIONS: Chart.ChartOptions = (
  isMobile: boolean,
  showDataLabels = false,
) => {
  const existingBarChartOptions = {
    ...BAR_CHART_OPTIONS(showDataLabels && !isMobile),
  };
  return {
    ...existingBarChartOptions,
    plugins: {
      ...existingBarChartOptions.plugins,
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: (_) => externalTooltipHandler(_, "opm_bar"),
      },
      datalabels: {
        display: showDataLabels,
        formatter: (_, context) =>
          context.chart.data.dataset?.[0]?.data?.[context.dataIndex],
        align: "top",
        anchor: "center",
        font: {
          size: "12",
          color: "#000000",
        },
      },
      title: {
        display: true,
        color: "#FAF9F6",
        text: TOTAL_ORDERS_PER_MINUTE,
        position: "bottom",
        font: {
          weight: 400,
        },
        padding: 20,
      },
    },
    layout: {
      padding: isMobile
        ? {
            left: 6,
            right: 20,
            top: 10,
            bottom: 40,
          }
        : {
            left: 10,
            right: 20,
            top: 20,
          },
    },
    scales: {
      ...existingBarChartOptions.scales,
      y: {
        grid: {
          color: "#00000033",
        },
        border: {
          display: false,
        },
      },
    },
  };
};

const getOpmChartGradient = (ctx) => {
  var gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, '#6370FF66');
  gradient.addColorStop(0.5, '#617AFD2E');
  gradient.addColorStop(1, '#6175FC00');
  return gradient;
}

export const OPM_OPTIONS = (isMobile: boolean, showDataLabels = false) => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: isMobile
      ? {
          left: 5,
          right: 20,
          top: 10,
          bottom: 40,
        }
      : {
          top: 50,
        },
  },
  scales: {
    y: {
      grid: {
        color: "#00000033",
      },
      border: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        color: "#FAF9F6",
        text: TOTAL_ORDERS_PER_MINUTE,
        padding: isMobile ? { top: 35, bottom: 35 } : { top: 15 },
      },
    },
  },
  fill: true,
  backgroundColor: (context) => {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    return getOpmChartGradient(ctx);
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: (_) => externalTooltipHandler(_, "opm"),
    },
    datalabels: {
      display: showDataLabels,
      formatter: (_, context) =>
        context.chart.data.dataset?.[0]?.data?.[context.dataIndex],
      align: "top",
      anchor: "center",
      font: {
        size: "12",
      },
    },
  },
  elements: {
    point: {
      radius: 4,
      backgroundColor: "white",
    },
  },
});

export const OPM_COMPARISON_OPTIONS = ({
  apiResponse,
  startDate,
  endDate,
  isMobile,
  showDataLabels = false,
}) => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: isMobile
      ? {
          left: 20,
          right: 20,
          top: 10,
          bottom: 40,
        }
      : {
          left: 30,
          right: 50,
          top: 50,
          bottom: 20,
        },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: TOTAL_ORDERS_PER_MINUTE,
        color: "#E8E8E8",
        position: "left",
        padding: isMobile ? { top: 20, bottom: 20 } : { top: 50 },
      },
    },
    y: {
      border: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      radius: 4,
      backgroundColor: "white",
    },
  },
  plugins: {
    datalabels: {
      display: showDataLabels,
      formatter: (_, context) =>
        context.chart.data.dataset?.[0]?.data?.[context.dataIndex],
      align: "top",
      anchor: "center",
      font: {
        size: "12",
      },
    },
    legend: {
      display: true,
      position: isMobile ? "top" : "bottom",
      align: "start",
      labels: {
        boxWidth: 30,
        backgroundColor: "transparent",
        generateLabels: () => {
          return Object.keys(apiResponse).map((_, index) => ({
            text:
              index === 0
                ? new Date(startDate)?.toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : endDate?.toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }),
            fillStyle: "transparent",
            lineWidth: 2,
            fontColor: index === 0 ? "#6370FF" : "#FDA44F",
            strokeStyle: index === 0 ? "#6370FF" : "#FDA44F",
          }));
        },
      },
    },
    tooltip: {
      enabled: false,
      external: (_) => externalTooltipHandler(_, "opmComparison"),
    },
  },
});

export const OPM_COMPARISON_OPTIONS_HOME = ({
  apiResponse,
  startDate,
  endDate,
  isMobile,
  showDataLabels = false,
}) => {
  const options = OPM_COMPARISON_OPTIONS({
    apiResponse,
    startDate,
    endDate,
    isMobile,
  });
  return {
    ...options,
    layout: {
      ...options.layout,
      padding: isMobile ? { left: 10, right: 20, top: 15, bottom: 0 } : {},
    },
    scales: {
      ...options.scales,
      x: {
        ...options.scales.x,
        title: {
          ...options.scales.x.title,
          padding: isMobile
            ? { top: 20, bottom: 20 }
            : { left: 50, top: 15, bottom: 0 },
        },
      },
    },
    plugins: {
      ...options.plugins,
      datalabels: {
        display: showDataLabels,
        formatter: (_, context: any) =>
          context.chart.data.dataset?.[0]?.data?.[context.dataIndex],
        align: "top",
        anchor: "center",
        font: {
          size: "10",
        },
      },
      legend: {
        ...options.plugins.legend,
        position: "top",
      },
    },
  };
};
