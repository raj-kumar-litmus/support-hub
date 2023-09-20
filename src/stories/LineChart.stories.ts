import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from "@storybook/jest"
import LineChart from '../components/LineChart';
import "../../public/index.css"

const meta = {
  title: 'Example/Line-Chart',
  component: LineChart,
  // This component will have an automatically generated Autodocs entry
  tags: ['autodocs'],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const LineChartWith3Entries: Story = {
  args: {
    data: {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => Math.floor(Math.random() * (5000 - 100))),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: labels.map(() => Math.floor(Math.random() * (3000 - 100))),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Dataset 3',
          data: labels.map(() => Math.floor(Math.random() * (3000 - 100))),
          borderColor: 'rgb(53, 112, 135)',
          backgroundColor: 'rgb(53, 112, 135)',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rotateBtn = await canvas.getByRole('button', {
      name: /Rotate/i,
    });
    expect(rotateBtn).toBeInTheDocument();
  },
};

export const LineChartWith5Entries: Story = {
  args: {
    data: {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => Math.floor(Math.random() * (5000 - 100))),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: labels.map(() => Math.floor(Math.random() * (3000 - 100))),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Dataset 3',
          data: labels.map(() => Math.floor(Math.random() * (3000 - 100))),
          borderColor: 'rgb(53, 112, 135)',
          backgroundColor: 'rgb(53, 112, 135)',
        },
        {
          label: 'Dataset 4',
          data: labels.map(() => Math.floor(Math.random() * (8000 - 600))),
          borderColor: 'rgb(153, 102, 100)',
          backgroundColor: 'rgb(153, 102, 100)',
        },
        {
          label: 'Dataset 5',
          data: labels.map(() => Math.floor(Math.random() * (6000 - 500))),
          borderColor: 'rgb(13, 12, 199)',
          backgroundColor: 'rgb(13, 12, 199)',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    }
  },
};

export const LineChartWith10Entries: Story = {
  args: {
    data: {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => Math.floor(Math.random() * (5000 - 100))),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: labels.map(() => Math.floor(Math.random() * (3000 - 100))),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Dataset 3',
          data: labels.map(() => Math.floor(Math.random() * (3000 - 100))),
          borderColor: 'rgb(53, 112, 135)',
          backgroundColor: 'rgb(53, 112, 135)',
        },
        {
          label: 'Dataset 4',
          data: labels.map(() => Math.floor(Math.random() * (8000 - 600))),
          borderColor: 'rgb(153, 102, 100)',
          backgroundColor: 'rgb(153, 102, 100)',
        },
        {
          label: 'Dataset 5',
          data: labels.map(() => Math.floor(Math.random() * (6000 - 500))),
          borderColor: 'rgb(13, 12, 199)',
          backgroundColor: 'rgb(13, 12, 199)',
        },
        {
          label: 'Dataset 6',
          data: labels.map(() => Math.floor(Math.random() * (5000 - 100))),
          borderColor: 'rgb(155, 99, 132)',
          backgroundColor: 'rgba(155, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 7',
          data: labels.map(() => Math.floor(Math.random() * (3000 - 100))),
          borderColor: 'rgb(153, 162, 235)',
          backgroundColor: 'rgba(153, 162, 235, 0.5)',
        },
        {
          label: 'Dataset 8',
          data: labels.map(() => Math.floor(Math.random() * (3000 - 100))),
          borderColor: 'rgb(253, 112, 135)',
          backgroundColor: 'rgb(253, 112, 135)',
        },
        {
          label: 'Dataset 9',
          data: labels.map(() => Math.floor(Math.random() * (8000 - 600))),
          borderColor: 'rgb(111, 102, 100)',
          backgroundColor: 'rgb(111, 102, 100)',
        },
        {
          label: 'Dataset 10',
          data: labels.map(() => Math.floor(Math.random() * (6000 - 500))),
          borderColor: 'rgb(99, 12, 199)',
          backgroundColor: 'rgb(99, 12, 199)',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    }
  },
};

export const RotatedLineChartWith3Entries: Story = {
  args: {
    data: {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => Math.floor(Math.random() * (5000 - 100))),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: labels.map(() => Math.floor(Math.random() * (3000 - 100))),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Dataset 3',
          data: labels.map(() => Math.floor(Math.random() * (3000 - 100))),
          borderColor: 'rgb(53, 112, 135)',
          backgroundColor: 'rgb(53, 112, 135)',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rotateBtn = await canvas.getByRole('button', {
      name: /Rotate/i,
    });

    expect(rotateBtn).toBeInTheDocument();
    await userEvent.click(rotateBtn);

    const unRotateBtn = await canvas.getByRole('button', {
      name: /Unrotate/i,
    });
    expect(unRotateBtn).toBeInTheDocument();
  },
};
