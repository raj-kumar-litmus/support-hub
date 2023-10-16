import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
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
  Tooltip,
  Legend,
  ChartDataLabels
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
      text: TOTAL_SESSIONS_PER_MIN,
      align: "center",
      position: "bottom",
      font: {
        size: CHART.TITLE_FONT_SIZE,
      },
    },
    datalabels: {
      display: false,
      // align: "center",
      // color: "white",
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
    },
  },
};

// export const HOME_SESSIONS_CHART: Chart.ChartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: "bottom",
//     },
//     title: {
//       display: true,
//       text: TOTAL_SESSIONS_PER_MIN,
//       align: "center",
//       position: "bottom",
//       font: {
//         size: CHART.TITLE_FONT_SIZE,
//       },
//     },
//     datalabels: {
//       align: "end",
//       anchor: "end",
//       color: "#757575",
//       // rotation: CHART.ROTATION_0,
//       font: {
//         size: CHART.DATALABEL_FONT_SIZE,
//       },
//     },
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false,
//       },
//     },
//     y: {
//       grid: {
//         display: true,
//       },
//       border: {
//         display: false,
//       },
//       ticks: {
//         display: false,
//         stepSize: SESSIONS_CHART.STEP_SIZE,
//         count: SESSIONS_CHART.TICK_COUNT,
//       },
//     },
//   },
//   datasets: {
//     bar: {
//       barPercentage: SESSIONS_CHART.BAR_PERCENT,
//       maxBarThickness: SESSIONS_CHART.MAX_BAR_THICKNESS,
//       borderRadius: SESSIONS_CHART.BAR_BORDER_RADIUS,
//     },
//   },
// };

export const HOME_OPM_CHART: Chart.ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: TOTAL_ORDERS_PER_MIN,
      },
    },
    y: {
      grid: {
        display: true,
      },
      border: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
    },
    datalabels: {
      display: false,
    },
  },
};

export const HOME_OPM_COMP_CHART: Chart.ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: TOTAL_ORDERS_PER_MIN,
      },
    },
    y: {
      grid: {
        display: true,
      },
      border: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "start",
      labels: {
        usePointStyle: true,
        // generateLabels: () => {
        //   return Object.keys(apiResponse).map((_, index) => ({
        //     text: index === 0 ? firstDate : secondDate,
        //     fillStyle: index === 0 ? "#BABABA" : "#757575",
        //     strokeStyle: index === 0 ? "#BABABA" : "#757575",
        //   }));
        // },
      },
    },
    tooltip: {
      displayColors: false,
    },
    datalabels: {
      display: false,
    },
  },
};
