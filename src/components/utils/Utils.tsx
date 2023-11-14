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
  {
    id: 8,
    name: "Order Report",
    icon: DashboardIcon,
    path: "/order-report"
  }
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

export const externalTooltipHandler = (context, type, customPosition?: boolean) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart, type, tooltip);
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

export const getTableHeaders = (data: Object[]) => {
  const keyArray = Object.keys(data[0])?.map((key) => key);
  return keyArray;
}

export const getChartTooltipPosition = (context, tooltipEl, tooltip) => {
  const position = context.chart.canvas.getBoundingClientRect();
  tooltipEl.style.opacity = "1";
  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left = position.left + tooltip.caretX + 'px';
  tooltipEl.style.top = position.top + tooltip.caretY + 'px';
  tooltipEl.style.padding = tooltip.padding + 'px ' + tooltip.padding + 'px';
  tooltipEl.style.pointerEvents = 'none';
}

export const getPieChartTooltip = (context) => {
  {
    let tooltipEl = document.getElementById('chartjs-tooltip');
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.innerHTML = "<table></table>";
      document.body.appendChild(tooltipEl);
    }
    const tooltipModel = context.tooltip;
    if (tooltipModel.opacity == 0) {
      tooltipEl.style.opacity = "0";
      return;
    }
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }
    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || [];
      const bodyLines = tooltipModel.body[0].lines;
      let innerHtml = '<table><tbody><tr><td>';
      bodyLines.forEach(function (body, i) {
        const colors = tooltipModel.labelColors[0];
        let style = 'background:' + colors.backgroundColor;
        style += '; border-radius: 6px';
        style += '; padding: 5px 10px';
        style += '; color: #FFFFFF';
        style += '; font-size: 12px';
        style += '; font-weight: 600';
        const span = '<span style="' + style + '">' + titleLines + ":" + body.split(":")[1] + '</span>';
        innerHtml += span + '</td></tr></tbody></table>';
      });
      let tableRoot = tooltipEl.querySelector('table');
      tableRoot.innerHTML = innerHtml;
    }
    const position = context.chart.canvas.getBoundingClientRect();
    tooltipEl.style.opacity = "1";
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
    tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
    tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
    tooltipEl.style.pointerEvents = 'none';
  }
}