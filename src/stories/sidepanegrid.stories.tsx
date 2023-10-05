import SidePaneGrid from "../components/common/sidepanegrid";
import type { Meta, StoryObj } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { MENU_LIST } from "../components/utils/Utils";

const meta = {
  title: "Stories/sidepane- mobile",
  component: SidePaneGrid,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
  },
} satisfies Meta<typeof SidePaneGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    menuList: MENU_LIST,
    selectedMenu: 0,
    showSidePaneGrid: true
  },
};

export const OnChange: Story = {
  args: {
    menuList: MENU_LIST,
    selectedMenu: 2,
    showSidePaneGrid: true
  },
};
