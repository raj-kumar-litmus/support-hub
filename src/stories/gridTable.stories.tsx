import type { Meta, StoryObj } from "@storybook/react";
import GridTable from "../components/molecules/GridTable";

const meta = {
  title: "Components/GridTable",
  component: GridTable,
  tags: ["autodocs"],
} satisfies Meta<typeof GridTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const gridData = [
  { data: "DSK" },
  { data: "MWB" },
  { data: "IPH" },
  { data: "AND" },
  { data: "CSC" },
  { data: "MPL" },
  { data: "ZAP" },
  { data: "INS" },
];

const gridData1 = [
  { data: "DSK" },
  { data: "MWB" },
  { data: "IPH" },
  { data: "AND" },
  { data: "CSC" },
  { data: "MPL", highlight: true },
  { data: "ZAP" },
  { data: "INS" },
];

const gridData2 = [
  { data: "DSK", severity: "low" },
  { data: "MWB" },
  { data: "IPH" },
  { data: "AND" },
  { data: "CSC" },
  { data: "MPL" },
  { data: "ZAP" },
  { data: "INS" },
];

const gridData3 = [
  { data: "DSK" },
  { data: "MWB" },
  { data: "IPH" },
  { data: "AND" },
  { data: "CSC" },
  { data: "MPL" },
  { data: "ZAP", severity: "high" },
  { data: "INS" },
];

export const Basic: Story = {
  args: {
    columns: 3,
    data: gridData,
    className: "w-96",
  },
};

export const WithHighlight: Story = {
  args: {
    columns: 3,
    data: gridData1,
    className: "w-96",
  },
};

export const WithSeverityLow: Story = {
  args: {
    columns: 3,
    data: gridData2,
    className: "w-96",
  },
};

export const WithSeverityHigh: Story = {
  args: {
    columns: 3,
    data: gridData3,
    className: "w-96",
  },
};
