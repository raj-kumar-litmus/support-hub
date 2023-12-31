import type { Meta, StoryObj } from "@storybook/react";
import CustomImage from "../components/atoms/CustomImage";
import DashboardIcon from "../assets/dashboard.svg";

const meta = {
  title: "Components/CustomImage",
  component: CustomImage,
  tags: ["autodocs"],
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

export const Preview: Story = {
  args: {
    src: DashboardIcon,
    alt: "dashboard",
    preview: true,
  },
};
