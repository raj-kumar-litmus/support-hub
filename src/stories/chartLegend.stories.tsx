import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import ChartLegend from "../components/atoms/ChartLegend";

const meta: any = {
  title: "Components/ChartLegend",
  component: ChartLegend,
  decorators: [
    (ChartLegend) => (
      <Router>
        <ChartLegend />
      </Router>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChartLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChartLegendOne: Story = {
  args: {
    text: "US",
    containerClassName: "text-red-100",
    circleColor: "bg-red-100",
  },
};

export const ChartLegendTwo: Story = {
  args: {
    text: "BOPIS Store Cancellation",
    containerClassName: "text-[#F1963A]",
    circleColor: "bg-[#F1963A]",
  },
};
