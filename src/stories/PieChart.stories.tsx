import type { Meta, StoryObj } from "@storybook/react";
import PieChart from "../components/PieChart";

const meta = {
  title: "Components/PieChart",
  component: PieChart,
  tags: ["autodocs"],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
        },
      ],
    },
    options: {
    },
  },
};

export const WithBorderColorAndBorderWidth: Story = {
  args: {
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
    },
  },
};

export const WithFixedWidthAndHeight: Story = {
  args: {
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
    },
    height: "400px",
    width: "400px"
  },
};

export const WithoutLegends: Story = {
  args: {
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  },
};

export const WithPointStyleLegend: Story = {
  args: {
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            usePointStyle: true,
          },
        },
      },
    },
  },
};

export const WithLegendPositionAndBoxWidth: Story = {
  args: {
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            boxWidth: 12,
          },
          position: 'right'
        },
      },
    },
  },
};

export const WithCustomDataLabelFontAndFormat: Story = {
  args: {
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: 'Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
          labels: {
            value: {
              color: 'blue'
            }
          }

        }
      },
    },
  }
}

export const WithCustomTooltip: Story = {
  args: {
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (d) => {
              const percentage = `${(Number(d.raw) * 100 / 44).toFixed(2)}%`

              return percentage
            },
          },
        },
      },
    },
  }
};


export const WithPadding: Story = {
  args: {
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: 'Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
      layout: {
        padding: 15
      },
    },
  }
}
