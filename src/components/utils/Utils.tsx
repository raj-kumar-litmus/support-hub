import DashboardIcon from "../../assets/dashboard.svg";
import OPMIcon from "../../assets/opm.svg";
import OPMComparisonIcon from "../../assets/opmcomparison.svg";
import SessionsIcon from "../../assets/sessions.svg";
import DCOpenOrdersIcon from "../../assets/dcopenorders.svg";

export const MENU_LIST = [
  { id: 1, name: "Home", icon: DashboardIcon, path: "/home" },
  { id: 2, name: "OPM", icon: OPMIcon, path: "/opm" },
  {
    id: 3,
    name: "OPM Comparison",
    icon: OPMComparisonIcon,
    path: "/opmcomparison",
  },
  { id: 4, name: "Sessions", icon: SessionsIcon, path: "/sessions" },
  {
    id: 5,
    name: "DC Open Orders",
    icon: DCOpenOrdersIcon,
    path: "/dc-open-orders",
  },
];
