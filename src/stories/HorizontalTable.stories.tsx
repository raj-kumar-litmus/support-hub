import type { Meta, StoryObj } from "@storybook/react";
import HorizontalTable from "../components/HorizontalTable";

const meta = {
  title: "Components/HorizontalTable",
  component: HorizontalTable,
  tags: ["autodocs"],
} satisfies Meta<typeof HorizontalTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const tableData = [{
  "DC Name:": "UDC",
  "Country:": "US",
  "Shipment Node:": "0801",
  "Workable Orders:": 3562,
},
{
  "DC Name:": "SDC",
  "Country:": "CA",
  "Shipment Node:": "2801",
  "Workable Orders:": 353
},]

export const Basic: Story = {
  args: {
    tableData: tableData,
    rowHeadClassName: "p-1 sm:p-4 text-left sm:text-right font-medium",
    dataClassName: "text-left p-1 sm:p-4 border-r border-black-400"
  }
}
export const withTableHead: Story = {
  args: {
    tableHead: "DC Open Orders",
    tableHeadClassName: "p-4",
    tableData: tableData,
    rowHeadClassName: "p-1 sm:p-4 text-left sm:text-right font-medium",
    dataClassName: "text-left p-1 sm:p-4 border-r border-black-400",
  }
}