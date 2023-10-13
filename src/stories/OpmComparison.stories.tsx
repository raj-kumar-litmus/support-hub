import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import OpmComparison from "../views/opmComparison";

const meta = {
  title: "Pages/OpmComparison",
  component: OpmComparison,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OpmComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpmComparisonPage: Story = {
  args: {},
};
