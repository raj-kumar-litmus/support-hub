import Navbar from "../components/common/navbar";
import type { Meta, StoryObj } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta = {
  title: "Stories/navbar",
  component: Navbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    showSidePane: true,
    showSidePaneGrid: false,
    openSearchField: false,
  },
};

export const Mobile: Story = {
  args: {
    showSidePane: true,
    showSidePaneGrid: true,
    openSearchField: false,
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
  },
};

export const MobileWithoutSideMenuIcon: Story = {
  args: {
    showSidePane: false,
    showSidePaneGrid: true,
    openSearchField: false,
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  }
};

