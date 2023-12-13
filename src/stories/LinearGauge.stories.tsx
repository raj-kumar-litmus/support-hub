import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import LinearGauge from "../components/common/LinearGauge";

const meta: any = {
  title: "Components/LinearGauge",
  component: LinearGauge,
  decorators: [
    (LinearGauge) => (
      <Router>
        <LinearGauge />
      </Router>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LinearGauge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinearGaugeOne: Story = {
  args: {
    propOne: 81,
    propTwo: 80,
    bgColorTwo: "bg-red-100",
    bgColorOne: "bg-blue-300",
    height: "50px",
    containerClassName: "w-[50vw]",
  },
};

export const LinearGaugeTwo: Story = {
  args: {
    propOne: 158679,
    propTwo: 25272,
    bgColorTwo: "bg-red-100",
    bgColorOne: "bg-blue-300",
    height: "50px",
    containerClassName: "w-[50vw]",
  },
};
