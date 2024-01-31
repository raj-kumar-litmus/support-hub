import { utils, writeFile } from "xlsx";
import DashboardIcon from "../../assets/dashboard.svg";
import DCOpenOrdersIcon from "../../assets/dcopenorders.svg";
import OPMIcon from "../../assets/opm.svg";
import OPMComparisonIcon from "../../assets/opmcomparison.svg";
import SessionsIcon from "../../assets/sessions.svg";
import {
  NUMBER_WITH_COMMAS_REGEX,
  PAGE_TITLES,
  SEVERITY,
} from "../constants/appConstants";

export const ROUTES = {
  home: "/home",
  opm: "/opm",
  opmComparison: "/opm-comparison",
  sessions: "/sessions",
  dcOpenOrders: "/dc-open-orders",
  fullScreen: "/fullscreen",
  orderDetails: "/order-details",
  orderReport: "/order-report",
  skuLookup: "/sku-lookup",
  incompleteOrders: "/incomplete-orders",
  focusRoom: "/focus-room",
  connectivityIssues: "/connectivity-issues",
  pageNotFound: "/page-not-found",
};

export const FETCH_TYPES = {
  HOME: "home",
  OPM: "opm",
  OPM_COMPARISON: "opm-comparison",
  SESSIONS: "sessions",
};

export const MENU_LIST = [
  {
    id: 1,
    name: PAGE_TITLES.DASHBOARD,
    icon: DashboardIcon,
    path: ROUTES.home,
  },
  { id: 2, name: PAGE_TITLES.OPM, icon: OPMIcon, path: ROUTES.opm },
  {
    id: 3,
    name: PAGE_TITLES.OPM_COMPARISON,
    icon: OPMComparisonIcon,
    path: ROUTES.opmComparison,
  },
  {
    id: 4,
    name: PAGE_TITLES.SESSIONS,
    icon: SessionsIcon,
    path: ROUTES.sessions,
  },
  {
    id: 5,
    name: PAGE_TITLES.DC_OPEN_ORDERS,
    icon: DCOpenOrdersIcon,
    path: ROUTES.dcOpenOrders,
  },
  {
    id: 6,
    name: PAGE_TITLES.ORDER_REPORT,
    icon: DashboardIcon,
    path: ROUTES.orderReport,
  },
  {
    id: 7,
    name: PAGE_TITLES.SKU_LOOKUP,
    icon: DCOpenOrdersIcon, //todo - change the icon
    path: ROUTES.skuLookup,
  },
  {
    id: 8,
    name: PAGE_TITLES.INCOMPLETE_ORDERS,
    icon: DCOpenOrdersIcon, //TODO Change icon
    path: ROUTES.incompleteOrders,
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

export const externalTooltipHandler = (
  context,
  type,
  customPosition = false,
) => {
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
    if (type === "session" || type === "opm_comp_bar") {
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
    if (type === "session" || type === "opm_comp_bar") {
      tableBody.classList.add("session-tooltip-tbody");
    }

    bodyLines.forEach((body, i) => {
      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";
      if (type === "session" || type === "opm_comp_bar") {
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
  if (customPosition) {
    getChartTooltipPosition(context, tooltipEl, tooltip);
  } else {
    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
  }
};

export const getChartTooltipPosition = (context, tooltipEl, tooltip) => {
  const position = context.chart.canvas.getBoundingClientRect();
  tooltipEl.style.opacity = "1";
  tooltipEl.style.position = "absolute";
  tooltipEl.style.left = position.left + tooltip.caretX + "px";
  tooltipEl.style.top = position.top + tooltip.caretY + "px";
  tooltipEl.style.padding = tooltip.padding + "px " + tooltip.padding + "px";
  tooltipEl.style.pointerEvents = "none";
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

export const increaseLegendSpacing = (customHeight) => [
  {
    id: "increase-legend-spacing",
    beforeInit(chart) {
      const originalFit = (chart.legend as any).fit;
      (chart.legend as any).fit = function fit() {
        originalFit.bind(chart.legend)();
        this.height += customHeight;
      };
    },
  },
];

export const centerText = ({
  screenWidth = 1366,
  screenHeight = 768,
  text = "HELLO WORLD",
  fillColor = "#F86E6E",
  textColor = "#fff",
  arcX = 220,
  arcY = 230,
  arcRadius = 200,
  arcStart = 0,
  arcEnd = 2 * Math.PI,
  isDisabledDoughNut = false,
  activePods = 0,
  totalPods = 0,
  isPopUp,
}) => ({
  id: "centerText",
  beforeDatasetsDraw(chart) {
    let warningIcon;
    if (isDisabledDoughNut) {
      warningIcon = new Image();
      warningIcon.src = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMS41ODIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMS41ODIgMTAiPgogIDxwYXRoIGlkPSJ3YXJuaW5nX0ZJTEwxX3dnaHQzMDBfR1JBRDBfb3BzejI0IiBkPSJNNzQuNjE4LTgzMGw1Ljc5MS0xMEw4Ni4yLTgzMFptNS43OTEtMS41MzlhLjQ0Ni40NDYsMCwwLDAsLjMyOS0uMTMzLjQ0Ni40NDYsMCwwLDAsLjEzMy0uMzI5LjQ0Ny40NDcsMCwwLDAtLjEzMy0uMzI5LjQ0Ny40NDcsMCwwLDAtLjMyOS0uMTMzLjQ0Ny40NDcsMCwwLDAtLjMyOS4xMzMuNDQ3LjQ0NywwLDAsMC0uMTMzLjMyOS40NDYuNDQ2LDAsMCwwLC4xMzMuMzI5QS40NDYuNDQ2LDAsMCwwLDgwLjQwOS04MzEuNTM2Wm0tLjQyOS0xLjQ5NGguODU3di0yLjg1N2gtLjg1N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03NC42MTggODM5Ljk5NykiIGZpbGw9IiNmYmZiZmMiLz4KPC9zdmc+Cg==`;
    }
    const { ctx, width, height } = chart;
    ctx.save();
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.beginPath();
    ctx.arc(arcX, arcY, arcRadius, arcStart, arcEnd);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${screenWidth / 114}px Helvetica`;
    ctx.fillStyle = textColor;
    ctx.textBaseline = "middle";
    ctx.fillText(text, centerX, centerY);

    if (!isDisabledDoughNut) {
      ctx.font = `${screenWidth / 171}px Helvetica`;
      ctx.fillText(`${activePods}/${totalPods}`, centerX, centerY + 15);
    }

    if (isDisabledDoughNut && warningIcon.complete) {
      ctx.drawImage(warningIcon, centerX - 5, centerY + 10, 10, 10);
    }
  },
});

export const exportToExcel = (data, name) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws);
  writeFile(wb, `${name}.xlsx`);
};

export const getSeverityStyles = (severity) => {
  switch (severity) {
    case SEVERITY.HIGH: {
      return {
        text: "text-red-400",
        boxShadow: "!shadow-6px-red",
        border: "border border-red-400",
      };
    }
    case SEVERITY.MED: {
      return {
        text: "text-yellow-400",
        boxShadow: "!shadow-6px-yellow",
        border: "border border-yellow-500",
      };
    }
    case SEVERITY.LOW: {
      return {
        border: "border border-green-500",
      };
    }
  }
};

export const numberWithCommas = (number) => {
  number = Math.round(number * 100) / 100;
  return number.toString().replace(NUMBER_WITH_COMMAS_REGEX, ",");
};

export const hunderedkandMilFormatter = (num) => {
  const absNum = Math.abs(num);

  if (absNum >= 1000000) {
    return Math.sign(num) * (absNum / 1000000).toFixed(2) + "M";
  } else if (absNum >= 999999) {
    return Math.sign(num) * (absNum / 1000).toFixed(2) + "k";
  } else {
    return numberWithCommas(num);
  }
};

export const numberToKandMformatter = (num) => {
  const absNum = Math.abs(num);

  if (absNum >= 1000000) {
    return Math.sign(num) * (absNum / 1000000).toFixed(2) + "M";
  } else if (absNum >= 999) {
    return Math.sign(num) * (absNum / 1000).toFixed(2) + "k";
  } else {
    return numberWithCommas(num);
  }
};

export const mapGridDataBopisAndSdd = (data, names) => {
  return names.map(({ shortName, description }) => {
    return {
      title: shortName,
      data: data[description],
    };
  });
};
