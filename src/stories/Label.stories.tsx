import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Label from "../components/common/Label";

const meta: any = {
  title: "Components/Label",
  component: Label,
  decorators: [
    (Label) => (
      <Router>
        <Label />
      </Router>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelOne: Story = {
  args: {
    text: "US",
    containerClassName: "text-red-100",
    color: "#CE7668",
  },
};

export const LabelTwo: Story = {
  args: {
    text: "CA",
    containerClassName: "text-red-100",
    color: "#41E2D8",
  },
};
