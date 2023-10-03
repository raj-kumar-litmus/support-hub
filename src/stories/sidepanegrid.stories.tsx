import SidePaneGrid from "../components/common/sidepanegrid";
import type { Meta, StoryObj } from '@storybook/react';
import DashboardIcon from '../assets/dashboard.svg';
import DataUsageIcon from '../assets/data_usage.svg';
import DCOpenOrdersIcon from '../assets/dc_open_orders.svg';
import LeaderboardIcon from '../assets/leaderboard.svg';
import LegendToggleIcon from '../assets/legend_toggle.svg';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const meta = {
    title: 'Stories/sidepane- mobile',
    component: SidePaneGrid,
    parameters: {
        viewport: {
            viewports: INITIAL_VIEWPORTS,
            defaultViewport: 'iphone6',
        },
    }
} satisfies Meta<typeof SidePaneGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const MENU_LIST = [
    { id: 1, name: "Home", icon: DashboardIcon },
    { id: 2, name: "OPM", icon: LeaderboardIcon },
    { id: 3, name: "OPM Comparison", icon: DataUsageIcon },
    { id: 4, name: "Session", icon: LegendToggleIcon },
    { id: 5, name: "DC Open Orders", icon: DCOpenOrdersIcon }
]

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
