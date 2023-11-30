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
  CHART_LABELS,
  CHART,
  DASHBOARD_LABELS,
  OPM_COMPARISON_CHART_STYLES,
  OPM_COMP_CHART_DEFAULT,
  OPM_CHART_DEFAULT,
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

//Session Chart
export const BAR_CHART_OPTIONS = (showDataLabels = false) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "start",
      maxWidth: 100,
      labels: {
        boxWidth: 6,
        boxHeight: 4,
        pointStyle: "circle",
        usePointStyle: true,
        textAlign: "right",
        generateLabels: (chart) => {
          const data = chart.data;
          if (data.datasets.length) {
            return data.datasets.map((dataset) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
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
      formatter: (value) => {
        if (value > 1000) {
          return (value / 1000).toFixed(1) + "K";
        } else {
          return value;
        }
      },
      color: "black",
      anchor: "end",
      align: "top",
      font: {
        size: CHART.DATALABEL_FONT_SIZE,
        family: CHART.FONT_FAMILY,
      },
      rotation: 270,
      color: "#ffffff",
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

const getOpmChartGradient = (ctx) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "#6370FF66");
  gradient.addColorStop(0.5, "#617AFD2E");
  gradient.addColorStop(1, "#6175FC00");
  return gradient;
};

//OPM Charts
export const OPM_OPTIONS = (isMobile: boolean, showDataLabels = false) => ({
  responsive: true,
  maintainAspectRatio: false,
  fill: true,
  backgroundColor: (context) => {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    return getOpmChartGradient(ctx);
  },
  scales: {
    y: {
      beginAtZero: true,
      max: OPM_CHART_DEFAULT.MAX,
      grid: {
        color: "#00000033",
      },
      border: {
        display: false,
      },
      ticks: {
        display: true,
        stepSize: OPM_CHART_DEFAULT.STEP_SIZE,
        count: OPM_CHART_DEFAULT.TICK_COUNT,
        callback: function (value) {
          if (value >= 1000) {
            return value / 1000 + "K";
          } else {
            return value;
          }
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    title: {
      display: true,
      text: CHART_LABELS.TOTAL_ORDERS_PER_MINUTE,
      position: "bottom",
      align: "center",
      color: "#FAF9F6",
      font: {
        weight: 50,
        size: CHART.TITLE_FONT_SIZE,
        family: CHART.FONT_FAMILY,
      },
      padding: {
        top: 10,
        bottom: 10,
      },
    },
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
      anchor: "end",
      align: "top",
      font: {
        size: CHART.DATALABEL_FONT_SIZE,
        family: CHART.FONT_FAMILY,
      },
      color: "#ffffff",
    },
  },
  elements: {
    point: {
      radius: 4,
      backgroundColor: "#FFFFFF",
    },
  },
});

export const OPM_OPTIONS_HOME = (isMobile: boolean, showDataLabels = false) => {
  const existingLineChartOptions = {
    ...OPM_OPTIONS(isMobile, showDataLabels),
  };
  return {
    ...existingLineChartOptions,
    plugins: {
      ...existingLineChartOptions.plugins,
      legend: {
        display: false,
      },
      title: {
        ...existingLineChartOptions.plugins.title,
      },
      tooltip: {
        enabled: false,
        external: (_) => externalTooltipHandler(_, "opm", true),
      },
    },
  };
};

export const OPM_BAR_CHART_OPTIONS = (
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
      title: {
        display: true,
        text: CHART_LABELS.TOTAL_ORDERS_PER_MINUTE,
        position: "bottom",
        align: "center",
        color: "#FAF9F6",
        font: {
          weight: 50,
          size: CHART.TITLE_FONT_SIZE,
          family: CHART.FONT_FAMILY,
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
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
        anchor: "end",
        align: "top",
        color: "#ffffff",
        font: {
          size: CHART.DATALABEL_FONT_SIZE,
          family: CHART.FONT_FAMILY,
        },
      },
    },
    scales: {
      ...existingBarChartOptions.scales,
      y: {
        beginAtZero: true,
        max: OPM_CHART_DEFAULT.MAX,
        grid: {
          color: "#00000033",
        },
        border: {
          display: false,
        },
        ticks: {
          display: true,
          stepSize: OPM_CHART_DEFAULT.STEP_SIZE,
          count: OPM_CHART_DEFAULT.TICK_COUNT,
          callback: function (value) {
            if (value >= 1000) {
              return value / 1000 + "K";
            } else {
              return value;
            }
          },
        },
      },
      x: {
        grid: {
          display: false,
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
  };
};

export const OPM_BAR_CHART_OPTIONS_HOME = (
  isMobile: boolean,
  showDataLabels = false,
) => {
  const existingBarChartOptions = {
    ...OPM_BAR_CHART_OPTIONS(isMobile, showDataLabels),
  };
  return {
    ...existingBarChartOptions,
    plugins: {
      ...existingBarChartOptions.plugins,
      tooltip: {
        enabled: false,
        external: (_) => externalTooltipHandler(_, "opm_bar", true),
      },
    },
  };
};

//OPM Comparison Charts
export const OPM_COMPARISON_OPTIONS = ({
  apiResponse,
  startDate,
  endDate,
  isMobile,
  showDataLabels = false,
}) => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      max: OPM_CHART_DEFAULT.MAX,
      grid: {
        color: "#00000033",
      },
      border: {
        display: false,
      },
      ticks: {
        display: true,
        stepSize: OPM_CHART_DEFAULT.STEP_SIZE,
        count: OPM_CHART_DEFAULT.TICK_COUNT,
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
  elements: {
    point: {
      radius: 4,
      backgroundColor: "#FFFFFF",
    },
  },
  plugins: {
    datalabels: {
      display: showDataLabels,
      formatter: (_, context) =>
        context.chart.data.dataset?.[0]?.data?.[context.dataIndex],
      anchor: "end",
      align: "top",
      font: {
        size: CHART.DATALABEL_FONT_SIZE,
        family: CHART.FONT_FAMILY,
      },
      color: "#ffffff",
    },
    legend: {
      display: true,
      position: isMobile ? "top" : "bottom",
      align: "start",
      fullWidth: false,
      labels: {
        boxWidth: 6,
        boxHeight: 4,
        pointStyle: "circle",
        usePointStyle: true,
        textAlign: "right",
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
            fillStyle:
              index === 0
                ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
            lineWidth: 1,
            fontColor:
              index === 0
                ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
            strokeStyle:
              index === 0
                ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
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
    plugins: {
      ...options.plugins,
      datalabels: {
        display: showDataLabels,
        formatter: (_, context: any) =>
          context.chart.data.dataset?.[0]?.data?.[context.dataIndex],
        anchor: "end",
        align: "top",
        font: {
          size: CHART.DATALABEL_FONT_SIZE,
          family: CHART.FONT_FAMILY,
        },
        color: "#ffffff",
      },
      legend: {
        ...options.plugins.legend,
        position: isMobile ? "top" : "bottom",
        labels: {
          ...options.plugins.legend.labels,
          generateLabels: () => {
            return Object.keys(apiResponse).map((_, index) => ({
              text: index === 0 ? DASHBOARD_LABELS.TODAY : DASHBOARD_LABELS.YESTERDAY,
              fillStyle:
                index === 0
                  ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                  : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
              lineWidth: 1,
              fontColor:
                index === 0
                  ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                  : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
              strokeStyle:
                index === 0
                  ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                  : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
            }));
          },
        },
      },
      tooltip: {
        enabled: false,
        external: (_) => externalTooltipHandler(_, "opmComparison", true),
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
        max: OPM_CHART_DEFAULT.MAX,
        grid: {
          color: "#00000033",
        },
        border: {
          display: false,
        },
        ticks: {
          display: true,
          stepSize: OPM_CHART_DEFAULT.STEP_SIZE,
          count: OPM_CHART_DEFAULT.TICK_COUNT,
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
  };
};

export const OPM_COMPARISON_BAR_OPTIONS = ({
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
    plugins: {
      ...options.plugins,
      datalabels: {
        ...options.plugins.datalabels,
        display: showDataLabels,
        color: "#ffffff",
        anchor: "end",
        align: "top",
      },
      legend: {
        ...options.plugins.legend,
        position: isMobile ? "top" : "bottom",
      },
      tooltip: {
        enabled: false,
        external: (_) => externalTooltipHandler(_, "opm_comp_bar"),
        mode: "index",
      },
    },
    datasets: {
      bar: {
        barPercentage: OPM_COMP_CHART_DEFAULT.BAR_PERCENT,
        maxBarThickness: OPM_COMP_CHART_DEFAULT.MAX_BAR_THICKNESS,
        borderRadius: OPM_COMP_CHART_DEFAULT.BAR_BORDER_RADIUS,
        categoryPercentage: OPM_COMP_CHART_DEFAULT.CATEGORY_PERCENT,
      },
    },
  };
};

export const OPM_COMPARISON_BAR_OPTIONS_HOME = ({
  apiResponse,
  startDate,
  endDate,
  isMobile,
  showDataLabels = false,
}) => {
  const options = OPM_COMPARISON_BAR_OPTIONS({
    apiResponse,
    startDate,
    endDate,
    isMobile,
    showDataLabels,
  });
  return {
    ...options,
    plugins: {
      ...options.plugins,
      legend: {
        ...options.plugins.legend,
        labels: {
          ...options.plugins.legend.labels,
          generateLabels: () => {
            return Object.keys(apiResponse).map((_, index) => ({
              text: index === 0 ? DASHBOARD_LABELS.TODAY : DASHBOARD_LABELS.YESTERDAY,
              fillStyle:
                index === 0
                  ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                  : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
              lineWidth: 1,
              fontColor:
                index === 0
                  ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                  : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
              strokeStyle:
                index === 0
                  ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                  : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
            }));
          },
        },
      },
      tooltip: {
        enabled: false,
        external: (_) => externalTooltipHandler(_, "opm_comp_bar", true),
        mode: "index",
      },
    },
  };
};
