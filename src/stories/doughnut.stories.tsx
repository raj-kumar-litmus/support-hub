import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import DoughnutChart from "../components/atoms/Doughnut";
import { centerText } from "../helpers/utils/utils";

const meta: any = {
  title: "Components/DoughNutChart",
  component: DoughnutChart,
  decorators: [
    (DoughnutChart) => (
      <Router>
        <DoughnutChart />
      </Router>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DoughnutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleChart: Story = {
  args: {
    options: {
      responsive: true,
    },
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
        },
      ],
    },
    containerClassName: "bg-gray-700 w-[60vw] h-[70vh]",
  },
};

export const TwoData: Story = {
  args: {
    options: {
      responsive: true,
    },
    data: {
      labels: ["Red", "Blue"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
      ],
    },
    containerClassName: "bg-gray-700 w-[60vw] h-[70vh]",
  },
};

export const NoLabels: Story = {
  args: {
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: false,
        },
      },
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 70],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
      ],
    },
    containerClassName: "bg-gray-700 w-[60vw] h-[70vh]",
  },
};

export const ThinBorders: Story = {
  args: {
    options: {
      responsive: true,
      cutout: "95%",
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
      ],
    },
    containerClassName: "bg-gray-700 w-[60vw] h-[70vh]",
  },
};

export const TwoDataSets: Story = {
  args: {
    options: {
      responsive: true,
      cutout: "90%",
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
        {
          label: "My Second Dataset",
          data: [30, 150],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
      ],
    },
    containerClassName: "bg-gray-700 w-[60vw] h-[70vh]",
  },
};

export const ThreeDataSets: Story = {
  args: {
    options: {
      responsive: true,
      cutout: "90%",
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
        {
          label: "My Second Dataset",
          data: [30, 150],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
        {
          label: "My Third Dataset",
          data: [130, 50],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
      ],
    },
    containerClassName: "bg-gray-700 w-[60vw] h-[70vh]",
  },
};

export const CenterText: Story = {
  args: {
    options: {
      responsive: true,
      cutout: "90%",
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 500],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
        {
          label: "My Second Dataset",
          data: [30, 150],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
      ],
    },
    plugins: [
      centerText({
        text: "CXS",
        arcX: 373,
        arcY: 380,
        arcRadius: 360,
        arcStart: 0,
        arcEnd: 2 * Math.PI,
      }),
    ],
    containerClassName: "bg-gray-700 w-[60vw] h-[80vh]",
  },
};

export const CenterTextAndMoreSpacing: Story = {
  args: {
    options: {
      responsive: true,
      cutout: "90%",
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50],
          weight: 5,
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
        { weight: 10 },
        {
          label: "My Second Dataset",
          data: [30, 150],
          weight: 5,
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
      ],
    },
    plugins: [
      centerText({
        text: "LOREM IPSUM",
        arcX: 373,
        arcY: 380,
        arcRadius: 360,
        arcStart: 0,
        arcEnd: 2 * Math.PI,
      }),
    ],
    containerClassName: "bg-gray-700 w-[60vw] h-[80vh]",
  },
};

export const CenterTextAndSingleColor: Story = {
  args: {
    options: {
      responsive: true,
      cutout: "90%",
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [20, 80],
          weight: 5,
          backgroundColor: ["rgb(255, 99, 132)", "white"],
        },
        { weight: 10 },
        {
          label: "My Second Dataset",
          data: [70, 30],
          weight: 5,
          backgroundColor: ["rgb(255, 99, 132)", "white"],
        },
      ],
    },
    plugins: [
      centerText({
        text: "FOO BAR",
        fillColor: "#3E4249",
        arcX: 373,
        arcY: 380,
        arcRadius: 365,
        arcStart: 0,
        arcEnd: 2 * Math.PI,
      }),
    ],
    containerClassName: "bg-gray-700 w-[60vw] h-[80vh]",
  },
};

export const RedDoughNut: Story = {
  args: {
    options: {
      responsive: true,
      cutout: "80%",
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [100],
          weight: 3,
          backgroundColor: ["#F86E6E"],
          borderColor: "#232323",
          borderWidth: 0,
        },
        {
          weight: 3,
          data: [100],
          borderColor: "#232323",
          borderWidth: 0,
          backgroundColor: ["#29292A"],
        },
        {
          label: "My Second Dataset",
          data: [100],
          weight: 3,
          borderColor: "#232323",
          borderWidth: 0,
          backgroundColor: ["#F86E6E"],
        },
      ],
    },
    plugins: [
      centerText({
        text: "FOO",
        fillColor: "#29292A",
        arcX: 373,
        arcY: 380,
        arcRadius: 300,
        arcStart: 0,
        arcEnd: 2 * Math.PI,
        activePods: 14,
        totalPods: 16,
      }),
    ],
    containerClassName: "bg-gray-700 w-[60vw] h-[80vh]",
  },
};

export const GreenDoughNut: Story = {
  args: {
    options: {
      responsive: true,
      cutout: "60%",
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [100],
          weight: 5,
          backgroundColor: ["#0EA67C"],
          borderColor: "#232323",
          borderWidth: 0,
        },
        {
          weight: 5,
          data: [100],
          borderColor: "#232323",
          borderWidth: 0,
          backgroundColor: ["#29292A"],
        },
        {
          label: "My Second Dataset",
          data: [100],
          weight: 5,
          borderColor: "#232323",
          borderWidth: 0,
          backgroundColor: ["#1A3B33"],
        },
        {
          weight: 5,
          data: [100],
          borderColor: "#232323",
          borderWidth: 0,
          backgroundColor: ["#29292A"],
        },
      ],
    },
    plugins: [
      centerText({
        text: "BAR",
        fillColor: "#0EA67C",
        arcX: 373,
        arcY: 380,
        arcRadius: 300,
        arcStart: 0,
        arcEnd: 2 * Math.PI,
      }),
    ],
    containerClassName: "bg-gray-700 w-[60vw] h-[80vh]",
  },
};

export const RedAndGreenDoughNut: Story = {
  args: {
    options: {
      responsive: true,
      cutout: "80%",
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [85, 15],
          weight: 3,
          backgroundColor: ["#BB723F", "#424245"],
          borderColor: "#232323",
          borderWidth: 0,
        },
        {
          weight: 3,
          data: [100],
          borderColor: "#232323",
          borderWidth: 0,
          backgroundColor: ["#29292A"],
        },
        {
          label: "My Second Dataset",
          data: [50, 50],
          weight: 3,
          borderColor: "#232323",
          borderWidth: 0,
          backgroundColor: ["#31737B", "#424245"],
        },
      ],
    },
    plugins: [
      centerText({
        text: "JER",
        fillColor: "#29292A",
        arcX: 373,
        arcY: 380,
        arcRadius: 300,
        arcStart: 0,
        arcEnd: 2 * Math.PI,
      }),
    ],
    containerClassName: "bg-gray-700 w-[60vw] h-[80vh]",
  },
};

export const FullRedAndHalfGreenDoughNut: Story = {
  args: {
    options: {
      responsive: true,
      cutout: "80%",
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [100],
          weight: 3,
          backgroundColor: ["#BB723F"],
          borderColor: "#232323",
          borderWidth: 0,
        },
        {
          weight: 3,
          data: [100],
          borderColor: "#232323",
          borderWidth: 0,
          backgroundColor: ["#29292A"],
        },
        {
          label: "My Second Dataset",
          data: [20, 80],
          weight: 3,
          borderColor: "#232323",
          borderWidth: 0,
          backgroundColor: ["#31737B", "#424245"],
        },
      ],
    },
    plugins: [
      centerText({
        text: "PRO",
        fillColor: "#29292A",
        arcX: 373,
        arcY: 380,
        arcRadius: 300,
        arcStart: 0,
        arcEnd: 2 * Math.PI,
        activePods: 10,
        totalPods: 16,
      }),
    ],
    containerClassName: "bg-gray-700 w-[60vw] h-[80vh]",
  },
};

export const DisabledDoughNut: Story = {
  args: {
    options: {
      responsive: true,
      cutout: "80%",
    },
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: [100],
          weight: 3,
          backgroundColor: ["#3E4249"],
          borderColor: "#232323",
          borderWidth: 0,
        },
      ],
    },
    plugins: [
      centerText({
        text: "CXS",
        fillColor: "#3E4249",
        arcX: 373,
        arcY: 380,
        arcRadius: 300,
        arcStart: 0,
        arcEnd: 2 * Math.PI,
        isDisabledDoughNut: true,
      }),
    ],
    isDisabledDoughNut: true,
    containerClassName: "bg-gray-700 w-[60vw] h-[80vh]",
  },
};
