import type { Meta } from "@storybook/react";
import Table from "../components/common/Table";

const meta = {
  title: "Example/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Table>;

export default meta;

export const Default = {
  args: {
    tableData: [
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
    ],
  },
};
