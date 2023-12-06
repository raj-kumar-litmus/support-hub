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
    propOne: "5796",
    propTwo: "21555",
    bgColorOne: "bg-black-400",
    bgColorTwo: "bg-red-500",
    height: "50px",
    containerClassName: "w-[50vw]",
  },
};

export const LinearGaugeTwo: Story = {
  args: {
    propOne: "72",
    propTwo: "69",
    bgColorOne: "bg-blue-100",
    bgColorTwo: "bg-green-200",
    height: "50px",
    containerClassName: "w-[50vw]",
  },
};

export const LinearGaugeThree: Story = {
  args: {
    propOne: "50",
    propTwo: "2",
    bgColorOne: "bg-pink-100",
    bgColorTwo: "bg-yellow-100",
    height: "50px",
    containerClassName: "w-[50vw]",
  },
};
