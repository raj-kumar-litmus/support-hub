import type { Meta } from "@storybook/react";
import Table from "./table";

const meta = {
  title: "Example/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Table>;

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

export const Default = {
  args: {
    tableData: tableData,
  },
};

export const StripedRows = {
  args: {
    tableData: tableData,
    stripedRows: true,
  },
};

export const TableGrid = {
  args: {
    tableData: tableData,
    showGridlines: true,
  },
};

export const RadioSelection = {
  args: {
    tableData: tableData,
    selectionMode: "radio",
  },
};

export const CheckboxSelection = {
  args: {
    tableData: tableData,
    selectionMode: "checkbox",
  },
};

export const SortableColumns = {
  args: {
    tableData: tableData,
    sortable: true,
  },
};
