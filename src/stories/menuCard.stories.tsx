import type { Meta, StoryObj } from "@storybook/react";
import MenuCard from "../components/molecules/MenuCard";
import DashboardIcon from "../assets/dashboard.svg";

const meta = {
  title: "Components/MenuCard",
  component: MenuCard,
  tags: ["autodocs"],
} satisfies Meta<typeof MenuCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    menu: { id: 1, name: "Home", icon: DashboardIcon, path: "/home" },
    selectedMenu: 0,
  },
};

export const Selected: Story = {
  args: {
    menu: { id: 1, name: "Home", icon: DashboardIcon, path: "/home" },
    selectedMenu: 1,
  },
};
