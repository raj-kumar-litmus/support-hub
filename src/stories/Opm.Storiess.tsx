import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import OPM from "../views/opm";

const meta = {
  title: "Components/Opm",
  component: OPM,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OPM>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OPMPage: Story = {
  args: {},
};
