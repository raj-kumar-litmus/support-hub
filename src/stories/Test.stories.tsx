import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Test from "../components/Test";

const meta = {
  title: "Components/Test",
  component: Test,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Test>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestPage: Story = {
  args: {},
};
