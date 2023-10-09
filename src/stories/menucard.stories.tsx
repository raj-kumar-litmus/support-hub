import DashboardIcon from "../assets/dashboard.svg";
import MenuCard from "../components/common/menucard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Stories/menucard",
  component: MenuCard,
} satisfies Meta<typeof MenuCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    menu: { id: 1, name: "Home", icon: DashboardIcon },
    selectedMenu: 0,
    setSelectedMenu: () => {},
  },
};

export const Selected: Story = {
  args: {
    menu: { id: 1, name: "Home", icon: DashboardIcon },
    selectedMenu: 1,
    setSelectedMenu: () => {},
  },
};
