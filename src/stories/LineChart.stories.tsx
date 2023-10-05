import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import LineChart from "../components/LineChart";

const meta = {
  title: "Components/LineChart",
  component: LineChart,
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
          backgroundColor: "rgb(001, 117, 008)",
          pointStyle: "circle",
          fill: true,
          borderWidth: 2,
        },
      ],
    },
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
          backgroundColor: "rgb(001, 117, 008)",
          pointStyle: "circle",
          fill: true,
          borderWidth: 2,
        },
        {
          label: "No of deliveries",
          data: [35, 207, 205, 11, 208, 222, 97, 208, 212, 24],
          borderColor: "rgb(117, 7, 917)",
          backgroundColor: "rgb(117, 7, 917)",
          pointStyle: "circle",
          fill: true,
          borderWidth: 2,
        },
      ],
    },
  },
};
