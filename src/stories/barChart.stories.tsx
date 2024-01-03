import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import BarChart from "../components/molecules/BarChart";

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
      "bg-black-101 border-2 border-solid border-black-102 px-6 pt-2 pb-0 rounded-xl w-46r h-96",
  },
};

const drawOuterBorderLines = {
  id: "drawOuterBorderLines",
  afterDatasetsDraw: (chart: any, _: any, opts: any) => {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
      scales: { x, y },
    } = chart;

    const { color = "#707070", width = "1" } = opts;

    ctx.beginPath();

    ctx.lineWidth = width;
    ctx.strokeStyle = color;

    ctx.moveTo(x.getPixelForValue(x.start), bottom);
    ctx.lineTo(x.getPixelForValue(x.start), top);

    ctx.moveTo(x.getPixelForValue(x.end), bottom);
    ctx.lineTo(x.getPixelForValue(x.end), top);

    ctx.moveTo(left, y.getPixelForValue(-0.5));
    ctx.lineTo(right, y.getPixelForValue(-0.5));

    ctx.stroke();
  },
};

export const HorizontalBarChart: Story = {
  args: {
    options: {
      layout: {
        padding: {
          top: 10,
        },
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          display: true,
          grid: {
            drawTicks: true,
            tickColor: "#29292a",
            color: "#5c5c5c",
            tickMarkLength: 0,
          },
          ticks: {
            color: "#FBFBFC",
          },
          border: {
            dash: [8, 8],
            color: "#707070",
          },
        },
      },
      indexAxis: "y",
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          display: true,
          anchor: "end",
          align: "end",
          color: "#fff",
          font: {
            size: 16,
          },
        },
      },
    },
    data: {
      labels: [1.1, 2.4, 1.4, 0.4],
      datasets: [
        {
          label: "No of orders",
          data: [1.1, 2.4, 1.4, 0.4],
          backgroundColor: ["#F1963A", "#4F73B8", "#08B39E", "#F06549"],
          barThickness: 40,
        },
      ],
    },
    plugin: [drawOuterBorderLines],
    className: "border border-[#707070] w-71.7w ml-2.85w mt-3h",
  },
};

export const HorizontalBarChartWithNegativeValues: Story = {
  args: {
    options: {
      layout: {
        padding: {
          top: 10,
        },
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          display: true,
          grid: {
            drawTicks: true,
            tickColor: "#29292a",
            color: "#5c5c5c",
            tickMarkLength: 0,
          },
          ticks: {
            color: "#FBFBFC",
          },
          border: {
            dash: [8, 8],
            color: "#707070",
          },
        },
      },
      indexAxis: "y",
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          display: true,
          anchor: "end",
          align: "end",
          color: "#fff",
          font: {
            size: 16,
          },
        },
      },
    },
    data: {
      labels: [1.1, 2.4, -1.4, 0.4],
      datasets: [
        {
          label: "No of orders",
          data: [1.1, 2.3, -1.4, 0.4],
          backgroundColor: ["#F1963A", "#4F73B8", "#08B39E", "#F06549"],
          barThickness: 40,
        },
      ],
    },
    plugin: [drawOuterBorderLines],
    className: "border border-[#707070] w-71.7w ml-2.85w mt-3h",
  },
};

export const StackedBarChart: Story = {
  args: {
    data: {
      labels: ["10:00", "11:00", "12:00", "01:00", "02:00", "03:00"],
      datasets: [
        {
          label: "Desktop",
          backgroundColor: "#F1963A",
          data: [17, 16, 10, 11, 8, 9],
          borderWidth: 3,
          barThickness: 30,
        },
        {
          label: "Iphone",
          backgroundColor: "#4F73B8",
          data: [14, 9, 10, 8, 12, 16],
          borderWidth: 3,
          barThickness: 30,
        },
        {
          label: "Mobile Web",
          backgroundColor: "#08B39E",
          data: [12, 21, 13, 9, 24, 17],
          borderWidth: 3,
          barThickness: 30,
        },
        {
          label: "Android",
          backgroundColor: "#e77687",
          data: [14, 9, 10, 8, 2, 16],
          borderWidth: 3,
          barThickness: 30,
        },
        {
          label: "CSC",
          backgroundColor: "#5cb7ed",
          data: [2, 1, 23, 9, 14, 7],
          borderWidth: 3,
          barThickness: 30,
        },
        {
          label: "M Plus",
          backgroundColor: "#a876e2",
          data: [12, 2, 13, 19, 24, 7],
          borderWidth: 3,
          barThickness: 30,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Total Orders Per Minute",
          position: "bottom",
          align: "center",
          color: "#FFFFFF",
          font: {
            weight: 50,
            size: 12,
            family: "Arial, sans-serif, Helvetica Neue",
          },
          padding: {
            top: 10,
            bottom: 10,
          },
        },
        datalabels: {
          display: false,
        },
        legend: {
          display: true,
          position: "top",
          align: "center",
          fullWidth: false,
          borderWidth: 0,
          borderColor: "rgba(0, 0, 0, 0)",
          labels: {
            boxWidth: 4,
            boxHeight: 4,
            pointStyle: "circle",
            usePointStyle: true,
            generateLabels: function (chart) {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.datasets.map(function (dataset) {
                  return {
                    text: dataset.label,
                    fillStyle: dataset.backgroundColor,
                    fontColor: dataset.backgroundColor,
                  };
                });
              }
              return [];
            },
          },
        },
      },

      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: "#FBFBFC",
            font: {
              size: 9,
              family: "Arial, sans-serif, Helvetica Neue",
            },
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grid: {
            color: "#495057",
          },
          border: {
            dash: [4, 4],
            display: false,
          },
          ticks: {
            color: "#FBFBFC",
            display: true,
            font: {
              size: 9,
              family: "Arial, sans-serif, Helvetica Neue",
            },
          },
        },
      },
    },
    className:
      "bg-black-101 border-2 border-solid border-black-102 px-6 pt-2 pb-0 rounded-xl w-29r h-64",
  },
};

export const StackedBarChartWithNegativeValue: Story = {
  args: {
    data: {
      labels: ["10:00", "11:00", "12:00", "01:00", "02:00", "03:00"],
      datasets: [
        {
          label: "Desktop",
          backgroundColor: "#F1963A",
          data: [17, 16, 10, 11, -8, -9],
          borderWidth: 3,
          barThickness: 30,
        },
        {
          label: "Iphone",
          backgroundColor: "#4F73B8",
          data: [14, 19, -10, 8, 12, 16],
          borderWidth: 3,
          barThickness: 30,
        },
        {
          label: "Mobile Web",
          backgroundColor: "#08B39E",
          data: [12, 21, 3, 9, -24, 17],
          borderWidth: 3,
          barThickness: 30,
        },
        {
          label: "Android",
          backgroundColor: "#e77687",
          data: [14, -9, 10, 8, -2, 16],
          borderWidth: 3,
          barThickness: 30,
        },
        {
          label: "CSC",
          backgroundColor: "#5cb7ed",
          data: [12, 8, 13, 9, 4, 17],
          borderWidth: 3,
          barThickness: 30,
        },
        {
          label: "M Plus",
          backgroundColor: "#a876e2",
          data: [12, -21, 13, 9, 24, 17],
          borderWidth: 3,
          barThickness: 30,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Total Orders Per Minute",
          position: "bottom",
          align: "center",
          color: "#FFFFFF",
          font: {
            weight: 50,
            size: 12,
            family: "Arial, sans-serif, Helvetica Neue",
          },
          padding: {
            top: 10,
            bottom: 10,
          },
        },
        datalabels: {
          display: false,
        },
        legend: {
          display: true,
          position: "top",
          align: "center",
          fullWidth: false,
          borderWidth: 0,
          borderColor: "rgba(0, 0, 0, 0)",
          labels: {
            boxWidth: 4,
            boxHeight: 4,
            pointStyle: "circle",
            usePointStyle: true,
            generateLabels: function (chart) {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.datasets.map(function (dataset) {
                  return {
                    text: dataset.label,
                    fillStyle: dataset.backgroundColor,
                    fontColor: dataset.backgroundColor,
                  };
                });
              }
              return [];
            },
          },
        },
      },

      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: "#FBFBFC",
            font: {
              size: 9,
              family: "Arial, sans-serif, Helvetica Neue",
            },
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grid: {
            color: "#495057",
          },
          border: {
            dash: [4, 4],
            display: false,
          },
          ticks: {
            color: "#FBFBFC",
            display: true,
            font: {
              size: 9,
              family: "Arial, sans-serif, Helvetica Neue",
            },
          },
        },
      },
    },
    className:
      "bg-black-101 border-2 border-solid border-black-102 px-6 pt-2 pb-0 rounded-xl w-29r h-64",
  },
};

export const HorizontalStackedBarChart: Story = {
  args: {
    data: {
      labels: ["10:00", "11:00", "12:00", "01:00", "02:00", "03:00"],
      datasets: [
        {
          label: "Desktop",
          backgroundColor: "#F1963A",
          data: [17, 16, 10, 11, 8, 9],
          borderWidth: 3,
          barThickness: 20,
        },
        {
          label: "Iphone",
          backgroundColor: "#4F73B8",
          data: [14, 9, 10, 8, 12, 16],
          borderWidth: 3,
          barThickness: 20,
        },
        {
          label: "Mobile Web",
          backgroundColor: "#08B39E",
          data: [12, 21, 13, 9, 24, 17],
          borderWidth: 3,
          barThickness: 20,
        },
        {
          label: "Android",
          backgroundColor: "#e77687",
          data: [14, 9, 10, 8, 2, 16],
          borderWidth: 3,
          barThickness: 20,
        },
        {
          label: "CSC",
          backgroundColor: "#5cb7ed",
          data: [2, 1, 23, 9, 14, 7],
          borderWidth: 3,
          barThickness: 20,
        },
        {
          label: "M Plus",
          backgroundColor: "#a876e2",
          data: [12, 2, 13, 19, 24, 7],
          borderWidth: 3,
          barThickness: 20,
        },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: {
        title: {
          display: true,
          text: "Total Orders Per Minute",
          position: "bottom",
          align: "center",
          color: "#FFFFFF",
          font: {
            weight: 50,
            size: 12,
            family: "Arial, sans-serif, Helvetica Neue",
          },
          padding: {
            top: 10,
            bottom: 10,
          },
        },
        datalabels: {
          display: false,
        },
        legend: {
          display: true,
          position: "top",
          align: "center",
          fullWidth: false,
          borderWidth: 0,
          borderColor: "rgba(0, 0, 0, 0)",
          labels: {
            boxWidth: 4,
            boxHeight: 4,
            pointStyle: "circle",
            usePointStyle: true,
            generateLabels: function (chart) {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.datasets.map(function (dataset) {
                  return {
                    text: dataset.label,
                    fillStyle: dataset.backgroundColor,
                    fontColor: dataset.backgroundColor,
                  };
                });
              }
              return [];
            },
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
          grid: {
            color: "#495057",
          },
          border: {
            dash: [4, 4],
            display: false,
          },
          ticks: {
            color: "#FBFBFC",
            display: true,
            font: {
              size: 9,
              family: "Arial, sans-serif, Helvetica Neue",
            },
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: "#FBFBFC",
            font: {
              size: 9,
              family: "Arial, sans-serif, Helvetica Neue",
            },
          },
        },
      },
    },
    className:
      "bg-black-101 border-2 border-solid border-black-102 px-6 pt-2 pb-0 rounded-xl w-29r h-64",
  },
};

export const HorizontalStackedBarChartWithNegativeValue: Story = {
  args: {
    data: {
      labels: ["10:00", "11:00", "12:00", "01:00", "02:00", "03:00"],
      datasets: [
        {
          label: "Desktop",
          backgroundColor: "#F1963A",
          data: [-17, -16, -10, -11, 8, 9],
          borderWidth: 3,
          barThickness: 20,
        },
        {
          label: "Iphone",
          backgroundColor: "#4F73B8",
          data: [-14, -19, 10, 8, -12, -16],
          borderWidth: 3,
          barThickness: 20,
        },
        {
          label: "Mobile Web",
          backgroundColor: "#08B39E",
          data: [-12, -21, -3, -9, 24, -17],
          borderWidth: 3,
          barThickness: 20,
        },
        {
          label: "Android",
          backgroundColor: "#e77687",
          data: [-14, 9, -10, -8, 2, -16],
          borderWidth: 3,
          barThickness: 20,
        },
        {
          label: "CSC",
          backgroundColor: "#5cb7ed",
          data: [-12, -8, -13, -9, -4, -17],
          borderWidth: 3,
          barThickness: 20,
        },
        {
          label: "M Plus",
          backgroundColor: "#a876e2",
          data: [-12, 21, -13, -9, -24, -17],
          borderWidth: 3,
          barThickness: 20,
        },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: {
        title: {
          display: true,
          text: "Total Orders Per Minute",
          position: "bottom",
          align: "center",
          color: "#FFFFFF",
          font: {
            weight: 50,
            size: 12,
            family: "Arial, sans-serif, Helvetica Neue",
          },
          padding: {
            top: 10,
            bottom: 10,
          },
        },
        datalabels: {
          display: false,
        },
        legend: {
          display: true,
          position: "top",
          align: "center",
          fullWidth: false,
          borderWidth: 0,
          borderColor: "rgba(0, 0, 0, 0)",
          labels: {
            boxWidth: 4,
            boxHeight: 4,
            pointStyle: "circle",
            usePointStyle: true,
            generateLabels: function (chart) {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.datasets.map(function (dataset) {
                  return {
                    text: dataset.label,
                    fillStyle: dataset.backgroundColor,
                    fontColor: dataset.backgroundColor,
                  };
                });
              }
              return [];
            },
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
          grid: {
            color: "#495057",
          },
          border: {
            dash: [4, 4],
            display: false,
          },
          ticks: {
            color: "#FBFBFC",
            font: {
              size: 9,
              family: "Arial, sans-serif, Helvetica Neue",
            },
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: "#FBFBFC",
            font: {
              size: 9,
              family: "Arial, sans-serif, Helvetica Neue",
            },
          },
        },
      },
    },
    className:
      "bg-black-101 border-2 border-solid border-black-102 px-6 pt-2 pb-0 rounded-xl w-29r h-64",
  },
};
