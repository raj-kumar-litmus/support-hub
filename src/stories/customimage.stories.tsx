import DashboardIcon from "../assets/dashboard.svg";
import CustomImage from "../components/common/customimage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Stories/customimage",
  component: CustomImage,
} satisfies Meta<typeof CustomImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    src: DashboardIcon,
    alt: "dashboard",
  },
};

export const WithoutImage: Story = {
  args: {
    src: "image",
    alt: "dashboard",
  },
};
