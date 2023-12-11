import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import SidePaneList from "../components/common/sidepanelist";
import { MENU_LIST } from "../utils/Utils";

const meta = {
  title: "Stories/sidepane-web",
  component: SidePaneList,
  decorators: [withRouter],
  tags: ["autodocs"],
} satisfies Meta<typeof SidePaneList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    menuList: MENU_LIST,
    selectedMenu: 0,
  },
};

export const OnChange: Story = {
  args: {
    menuList: MENU_LIST,
    selectedMenu: 2,
  },
};
