import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import SidePaneGrid from "../components/organisms/sidepanegrid";
import { MENU_LIST } from "../utils/Utils";

const meta = {
  title: "Components/SidepaneMobile",
  component: SidePaneGrid,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
  },
  decorators: [withRouter],
  tags: ["autodocs"],
} satisfies Meta<typeof SidePaneGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    menuList: MENU_LIST,
    selectedMenu: 0,
    showSidePaneGrid: true,
  },
};

export const OnChange: Story = {
  args: {
    menuList: MENU_LIST,
    selectedMenu: 2,
    showSidePaneGrid: true,
  },
};
