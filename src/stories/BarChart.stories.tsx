import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import BarChart from "../components/BarChart";

const meta = {
  title: "Components/BarChart",
  component: BarChart,
  decorators: [
    (BarChart) => (
      <Router>
        <BarChart />
      </Router>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicBarChart: Story = {
  args: {
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
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
          label: "No of orders",
          data: [95, 107, 105, 111, 108, 122, 107, 108, 112, 94],
          backgroundColor: "#0977FF",
        },
      ],
    },
    className:
      "bg-gray-700 border-0 rounded-10 w-71.7w ml-2.85w h-62.23h mt-3h",
  },
};

export const MultipleBarChartWithLegends: Story = {
  args: {
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
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
          label: "Dataset 1",
          data: [95, 107, 105, 111, 58, 122, 107, 128, 112, 194],
          backgroundColor: "#0977FF",
        },
        {
          label: "Dataset 2",
          data: [35, 207, 205, 11, 208, 222, 97, 208, 212, 24],
          backgroundColor: "#41E2D8",
        },
      ],
    },
    className:
      "bg-gray-700 border-0 rounded-10 w-71.7w ml-2.85w h-62.23h mt-3h",
  },
};

export const BarChartWithCustomGridStyles: Story = {
  args: {
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          align: "start",
        },
        title: {
          display: true,
          text: "Sessions",
          color: "#ffffff",
          font: {
            size: 14,
          },
          position: "top",
          align: "start",
          padding: 20,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          display: true,
          beginAtZero: true,
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
          },
          border: {
            dash: [1, 5],
            color: "#29292a",
          },
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
          label: "Dataset 1",
          data: [95, 107, 105, 111, 58, 122, 107, 128, 112, 194],
          backgroundColor: "#0977FF",
        },
        {
          label: "Dataset 2",
          data: [35, 207, 205, 11, 208, 222, 97, 208, 212, 24],
          backgroundColor: "#41E2D8",
        },
      ],
    },
    className:
      "bg-[#29292a] border-2 border-solid border-[#202021] px-6 pt-2 pb-0 rounded-xl w-[46rem] h-96",
  },
};
