import type { Meta } from "@storybook/react";
import { Column } from "primereact/column";
import CustomTable from "../components/atoms/customtable";
import { getTableHeaders } from "../helpers/utils/utils";

const meta = {
  title: "Components/Table",
  component: CustomTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CustomTable>;

export default meta;

const tableData = [
  {
    "DC Name": "UDC",
    Country: "US",
    "Shipment Node": "0801",
    "Workable Orders": 3562,
  },
  {
    "DC Name": "SDC",
    Country: "US",
    "Shipment Node": "1001",
    "Workable Orders": 18451,
  },
  {
    "DC Name": "WDC",
    Country: "US",
    "Shipment Node": "1021",
    "Workable Orders": 16620,
  },
];

const children = getTableHeaders(tableData).map((item, index) => (
  <Column key={index} field={item} header={item}></Column>
));

const sortableChildren = getTableHeaders(tableData).map((item, index) => (
  <Column key={index} field={item} header={item} sortable></Column>
));

export const Default = {
  args: {
    value: tableData,
    children: children,
  },
};

export const StripedRows = {
  args: {
    value: tableData,
    children: children,
    stripedRows: true,
  },
};

export const TableGrid = {
  args: {
    value: tableData,
    children: children,
    showGridlines: true,
  },
};

export const TableWithHeader = {
  args: {
    value: tableData,
    children: children,
    header: "Table Header",
  },
};

export const TableWithFooter = {
  args: {
    value: tableData,
    children: children,
    footer: "Table Footer",
  },
};

export const SortableColumns = {
  args: {
    value: tableData,
    children: sortableChildren,
    sortMode: "multiple",
  },
};
