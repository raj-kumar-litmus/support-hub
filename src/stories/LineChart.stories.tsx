import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { BrowserRouter as Router } from "react-router-dom";
import LineChart from "../components/LineChart";

const meta = {
  title: "Components/LineChart",
  component: LineChart,
  decorators: [
    (LineChart) => (
      <Router>
        <LineChart />
      </Router>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLineChart: Story = {
  args: {
    options: {
      responsive: true,
    },
    data: {
      labels: [
        "08:24",
        "08:25",
        "08:26",
        "08:27",
        "08:28",
        "08:29",
        "08:30",
        "08:31",
        "08:32",
        "08:33",
      ],
      datasets: [
        {
          label: "No of orders",
          data: [95, 107, 105, 111, 108, 122, 107, 108, 112, 94],
          borderColor: "rgb(117, 117, 117)",
          backgroundColor: "rgb(001, 117, 112)",
          pointStyle: "circle",
          fill: false,
          borderWidth: 2,
        },
      ],
    },
    className:
      "bg-gray-700 border-0 rounded-10 w-71.7w ml-2.85w h-62.23h mt-3h",
  },
};

export const SingleLineChartWithFilledBackground: Story = {
  args: {
    options: {
      responsive: true,
    },
    data: {
      labels: [
        "08:24",
        "08:25",
        "08:26",
        "08:27",
        "08:28",
        "08:29",
        "08:30",
        "08:31",
        "08:32",
        "08:33",
      ],
      datasets: [
        {
          label: "No of orders",
          data: [95, 107, 105, 111, 108, 122, 107, 108, 112, 94],
          borderColor: "rgb(117, 117, 117)",
          backgroundColor: "rgb(001, 117, 112)",
          pointStyle: "circle",
          fill: true,
          borderWidth: 2,
        },
      ],
    },
    className:
      "bg-gray-700 border-0 rounded-10 w-71.7w ml-2.85w h-62.23h mt-3h",
  },
};

export const MultiLineChart: Story = {
  args: {
    options: {
      responsive: true,
    },
    data: {
      labels: [
        "08:24",
        "08:25",
        "08:26",
        "08:27",
        "08:28",
        "08:29",
        "08:30",
        "08:31",
        "08:32",
        "08:33",
      ],
      datasets: [
        {
          label: "No of orders",
          data: [95, 107, 105, 111, 58, 122, 107, 128, 112, 194],
          borderColor: "rgb(117, 117, 117)",
          backgroundColor: "rgb(001, 117, 112)",
          pointStyle: "circle",
          fill: false,
          borderWidth: 2,
        },
        {
          label: "No of deliveries",
          data: [35, 207, 205, 11, 208, 222, 97, 208, 212, 24],
          borderColor: "rgb(117, 7, 917)",
          backgroundColor: "rgb(117, 107, 175)",
          pointStyle: "circle",
          fill: false,
          borderWidth: 2,
        },
      ],
    },
    className:
      "bg-gray-700 border-0 rounded-10 w-71.7w ml-2.85w h-62.23h mt-3h",
  },
};

export const MultiLineChartWithFilledBackGround: Story = {
  args: {
    options: {
      responsive: true,
    },
    data: {
      labels: [
        "08:24",
        "08:25",
        "08:26",
        "08:27",
        "08:28",
        "08:29",
        "08:30",
        "08:31",
        "08:32",
        "08:33",
      ],
      datasets: [
        {
          label: "No of orders",
          data: [95, 107, 105, 111, 58, 122, 107, 128, 112, 194],
          borderColor: "rgb(117, 117, 117)",
          backgroundColor: "rgb(001, 117, 112)",
          pointStyle: "circle",
          fill: true,
          borderWidth: 2,
        },
        {
          label: "No of deliveries",
          data: [35, 207, 205, 11, 208, 222, 97, 208, 212, 24],
          borderColor: "rgb(117, 7, 917)",
          backgroundColor: "rgb(117, 107, 175)",
          pointStyle: "circle",
          fill: true,
          borderWidth: 2,
        },
      ],
    },
    className:
      "bg-gray-700 border-0 rounded-10 w-71.7w ml-2.85w h-62.23h mt-3h",
  },
};

export const MultiLineCurvyChartWithTwoLines: Story = {
  args: {
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "CPU Usage",
          position: "top",
          align: "start",
          font: {
            size: 18,
          },
          padding: {
            top: 20,
            bottom: 24,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            color: "#eaeaea",
            width: 2,
          },
          title: {
            display: true,
            text: "Time Intervals",
            font: {
              size: 12,
              weight: 600,
            },
            padding: {
              top: 12,
              bottom: 0,
            },
          },
          ticks: {
            padding: 2,
          },
        },
        y: {
          display: true,
          beginAtZero: true,
          max: 100,
          stepSize: 6,
          grid: {
            drawTicks: true,
            tickColor: "#ffffff",
          },
          ticks: {
            display: true,
            stepSize: 20,
            count: 6,
            callback: function (value) {
              return `${value}%`;
            },
          },
          border: {
            dash: [5, 10],
            color: "#ffffff",
          },
        },
      },
      datasets: {
        line: {
          pointStyle: false,
          borderWidth: 3,
          tension: 0.4,
        },
      },
    },
    data: {
      labels: [
        "10:01",
        "10:02",
        "10:03",
        "10:04",
        "10:05",
        "10:06",
        "10:07",
        "10:08",
        "10:09",
        "10:10",
      ],
      datasets: [
        {
          data: [20, 20, 40, 60, 35, 60, 40, 40, 22, 20],
          borderColor: "#767676",
          fill: true,
        },
        {
          data: [40, 40, 25, 55, 80, 35, 80, 55, 20, 20],
          borderColor: "#bebebe",
          fill: true,
        },
      ],
    },
    className:
      "bg-white-500 border-2 border-solid border-[#ededed] px-6 pt-2 pb-0 rounded-xl w-[46rem] h-96",
  },
};

export const MultiLineCurvyChartWithMultipleLines: Story = {
  args: {
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "CPU Usage",
          position: "top",
          align: "start",
          font: {
            size: 18,
          },
          padding: {
            top: 20,
            bottom: 24,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            color: "#eaeaea",
            width: 2,
          },
          title: {
            display: true,
            text: "Time Intervals",
            font: {
              size: 12,
              weight: 600,
            },
            padding: {
              top: 12,
              bottom: 0,
            },
          },
          ticks: {
            padding: 2,
          },
        },
        y: {
          display: true,
          beginAtZero: true,
          max: 100,
          stepSize: 6,
          grid: {
            drawTicks: true,
            tickColor: "#ffffff",
          },
          ticks: {
            display: true,
            stepSize: 20,
            count: 6,
            callback: function (value) {
              return `${value}%`;
            },
          },
          border: {
            dash: [5, 10],
            color: "#ffffff",
          },
        },
      },
      datasets: {
        line: {
          pointStyle: false,
          borderWidth: 3,
          tension: 0.4,
        },
      },
    },
    data: {
      labels: [
        "10:01",
        "10:02",
        "10:03",
        "10:04",
        "10:05",
        "10:06",
        "10:07",
        "10:08",
        "10:09",
        "10:10",
      ],
      datasets: [
        {
          data: [20, 20, 40, 60, 35, 60, 40, 40, 22, 20],
          borderColor: "#767676",
        },
        {
          data: [40, 40, 25, 55, 80, 35, 80, 55, 20, 20],
          borderColor: "#bebebe",
        },
        {
          data: [20, 20, 40, 40, 80, 70, 30, 30, 20, 20],
          borderColor: "#b2b2b2",
        },
        {
          data: [40, 40, 60, 40, 70, 60, 70, 30, 40, 30],
          borderColor: "#ededed",
        },
      ],
    },
    className:
      "bg-white-500 border-2 border-solid border-[#ededed] px-6 pt-2 pb-0 rounded-xl w-[46rem] h-96",
  },
};

export const MultiLineDarkBgCurvyLineChart: Story = {
  args: {
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "CPU Usage",
          position: "top",
          align: "start",
          color: "#ffffff",
          font: {
            size: 18,
          },
          padding: {
            top: 20,
            bottom: 24,
          },
        },
        datalabels: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            color: "#5c5c5c",
            width: 1,
          },
          title: {
            display: true,
            text: "Time Intervals",
            color: "#ffffff",
            font: {
              size: 12,
              weight: 600,
            },
            padding: {
              top: 12,
              bottom: 0,
            },
          },
          ticks: {
            padding: 2,
          },
        },
        y: {
          display: true,
          beginAtZero: true,
          max: 100,
          stepSize: 6,
          grid: {
            drawTicks: true,
            tickColor: "#29292a",
            color: "#5c5c5c",
          },
          ticks: {
            display: true,
            stepSize: 20,
            count: 6,
            callback: function (value) {
              return `${value}%`;
            },
          },
          border: {
            dash: [1, 5],
            color: "#29292a",
          },
        },
      },
      datasets: {
        line: {
          pointStyle: false,
          borderWidth: 3,
          tension: 0.4,
        },
      },
    },
    data: {
      labels: [
        "10:01",
        "10:02",
        "10:03",
        "10:04",
        "10:05",
        "10:06",
        "10:07",
        "10:08",
        "10:09",
        "10:10",
      ],
      datasets: [
        {
          data: [20, 20, 40, 60, 30, 60, 40, 40, 20, 20],
          borderColor: "#e7c203",
        },
        {
          data: [40, 40, 20, 60, 80, 30, 80, 40, 20, 20],
          borderColor: "#6d7eda",
        },
        {
          data: [20, 20, 40, 40, 80, 90, 30, 30, 20, 20],
          borderColor: "#3ec2c3",
        },
        {
          data: [20, 20, 30, 30, 40, 40, 50, 20, 20, 20],
          borderColor: "#f07921",
        },
      ],
    },
    className:
      "bg-[#29292a] border-2 border-solid border-[#202021] px-6 pt-2 pb-0 rounded-xl w-[46rem] h-96",
  },
};
