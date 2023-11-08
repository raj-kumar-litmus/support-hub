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
    path: "/opm-comparison",
  },
  { id: 4, name: "Sessions", icon: SessionsIcon, path: "/sessions" },
  {
    id: 5,
    name: "DC Open Orders",
    icon: DCOpenOrdersIcon,
    path: "/dc-open-orders",
  },
  {
    id:9,
    name: "Incomplete Orders",
    icon:OPMComparisonIcon,
    path:"/incomplete-orders"
  }
];

const getOrCreateTooltip = (chart, type) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div.toolTipEl");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "toolTipEl";

    const table = document.createElement("table");
    table.className = "tableToolTip";

    const verticalLine = document.createElement("hr");
    verticalLine.className = `horizontalLine ${type}`;

    tooltipEl.appendChild(table);
    tooltipEl.appendChild(verticalLine);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = (context, type) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart, type);
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines =
      tooltip.body?.[0]?.lines && tooltip.body[0].lines[0].split(":");

    const tableHead = document.createElement("thead");

    titleLines.forEach((title) => {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement("tbody");

    bodyLines.forEach((body, i) => {
      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";

      const td = document.createElement("td");
      const text = document.createTextNode(body);

      if (i === 0) {
        td.style.fontWeight = "200";
      }

      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector("table");

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
};

