import DashboardIcon from "../../assets/dashboard.svg";
import DataUsageIcon from "../../assets/data_usage.svg";
import DCOpenOrdersIcon from "../../assets/dc_open_orders.svg";
import LeaderboardIcon from "../../assets/leaderboard.svg";
import LegendToggleIcon from "../../assets/legend_toggle.svg";

export const MENU_LIST = [
  { id: 1, name: "Home", icon: DashboardIcon, path: "/home" },
  { id: 2, name: "OPM", icon: LeaderboardIcon, path: "/home" },
  { id: 3, name: "OPM Comparison", icon: DataUsageIcon, path: "/home" },
  { id: 4, name: "Session", icon: LegendToggleIcon, path: "/sessions" },
  {
    id: 5,
    name: "DC Open Orders",
    icon: DCOpenOrdersIcon,
    path: "/dc-open-orders",
  },
];
