import DashboardIcon from "../../assets/dashboard.svg";
import OPMIcon from "../../assets/opm.svg";
import OPMComparisonIcon from "../../assets/opmcomparison.svg";
import SessionsIcon from "../../assets/sessions.svg";
import DCOpenOrdersIcon from "../../assets/dcopenorders.svg";

export const MENU_LIST = [
  { id: 1, name: "Dashboard", icon: DashboardIcon, path: "/home" },
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

const getOrCreateTooltip = (chart, type, tooltip) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div.toolTipEl");
  const shouldRenderPin = ["opm", "opmComparison"].includes(type);

  if (shouldRenderPin && tooltipEl) {
    const line = tooltipEl.querySelector(".horizontalLine");
    const index = tooltip?.dataPoints?.[0]?.dataset?.index;
    line.setAttribute("class", "");
    type === "opm"
      ? line.setAttribute("class", `horizontalLine opm`)
      : line.setAttribute(
          "class",
          `horizontalLine ${index === 0 ? "yellow" : "blue"}`,
        );
  }

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "toolTipEl";

    const table = document.createElement("table");
    table.className = "tableToolTip";

    if (shouldRenderPin) {
      const verticalLine = document.createElement("hr");
      const index = tooltip?.dataPoints?.[0]?.dataset?.index;
      verticalLine.className =
        type === "opm"
          ? `horizontalLine opm`
          : `horizontalLine ${index === 0 ? "yellow" : "blue"}`;
      tooltipEl.appendChild(table);
      tooltipEl.appendChild(verticalLine);
    } else {
      tooltipEl.appendChild(table);
    }
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = (context, type) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart, type, tooltip);
  tooltipEl.style.zIndex = 20;
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    let bodyLines = [];
    if (type === "session") {
      tooltip.body.forEach((bodyLineItem) => {
        if (bodyLineItem.lines) {
          bodyLines = [...bodyLines, ...bodyLineItem.lines[0].split(":")];
        }
      });
    } else {
      bodyLines =
        tooltip.body?.[0]?.lines && tooltip.body[0].lines[0].split(":");
    }

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
    if (type === "session") {
      tableBody.classList.add("session-tooltip-tbody");
    }

    bodyLines.forEach((body, i) => {
      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";
      if (type === "session") {
        if (i === 0 || i === 2) {
          tr.classList.add("session-col-1");
        } else {
          tr.classList.add("session-col-2");
          tr.style.textAlign = "-webkit-right";
        }
      }
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

export const getTableHeaders = (data: object[]) => {
  const keyArray = Object.keys(data[0])?.map((key) => key);
  return keyArray;
};

export const convert24to12Hour = (hour) => {
  const convertedHour = parseInt(hour, 10);
  if (convertedHour === 0) {
    return { hour12: 0, ampm: "AM" };
  } else if (convertedHour >= 1 && convertedHour <= 11) {
    return { hour12: convertedHour, ampm: "AM" };
  } else if (convertedHour === 12) {
    return { hour12: 12, ampm: "PM" };
  } else {
    return { hour12: convertedHour - 12, ampm: "PM" };
  }
};

export const convert12to24Hour = (hour, ampm) => {
  let convertedHour = parseInt(hour, 10);
  if (ampm === "PM" && convertedHour < 12) {
    convertedHour += 12;
  } else if (ampm === "AM" && convertedHour === 12) {
    convertedHour = 0;
  }
  return convertedHour;
};
export const submitOnEnter = (callback) => {
  const handleGlobalKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callback(event);
    }
  };

  document.addEventListener("keydown", handleGlobalKeyDown);

  return () => {
    document.removeEventListener("keydown", handleGlobalKeyDown);
  };
};
