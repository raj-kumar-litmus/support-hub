import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/common/navbar";

const meta = {
  title: "Stories/navbar",
  component: Navbar,
  decorators: [
    () => (
      <Router>
        <Navbar />
      </Router>
    ),
  ],
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
      defaultViewport: "iphone6",
    },
  },
};
