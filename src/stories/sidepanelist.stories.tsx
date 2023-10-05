import SidePaneList from "../components/common/sidepanelist";
import type { Meta, StoryObj } from '@storybook/react';
import { MENU_LIST } from "../components/utils/Utils";

const meta = {
    title: 'Stories/sidepane-web',
    component: SidePaneList,
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
