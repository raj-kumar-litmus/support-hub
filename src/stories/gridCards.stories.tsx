import type { Meta, StoryObj } from "@storybook/react";
import GridCards from "../components/molecules/GridCards";
import { SEVERITY } from "../helpers/constants/appConstants";
import Warning from "../assets/warning.svg";

const meta = {
  title: "Components/GridCards",
  component: GridCards,
  tags: ["autodocs"],
} satisfies Meta<typeof GridCards>;

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
  { data: "MPL", severity: SEVERITY.HIGH },
  { data: "ZAP" },
  { data: "INS" },
];

const gridData2 = [
  { data: "DSK", severity: SEVERITY.MED },
  { data: "MWB" },
  { data: "IPH" },
  { data: "AND" },
  { data: "CSC" },
  { data: "MPL" },
  { data: "ZAP" },
  { data: "INS" },
];

const gridData3 = [
  { data: "DSK", icon: Warning },
  { data: "MWB" },
  { data: "IPH" },
  { data: "AND" },
  { data: "CSC" },
  { data: "MPL" },
  { data: "ZAP" },
  { data: "INS" },
];

const gridData4 = [
  { data: "DSK", title: "Desktop" },
  { data: "MWB", title: "Mobile Web" },
];

export const Basic: Story = {
  args: {
    columns: 3,
    data: gridData,
    className: "w-96",
  },
};

export const WithSeverityHigh: Story = {
  args: {
    columns: 3,
    data: gridData1,
    className: "w-96",
  },
};

export const WithSeverityMedium: Story = {
  args: {
    columns: 3,
    data: gridData2,
    className: "w-96",
  },
};

export const WithIcon: Story = {
  args: {
    columns: 3,
    data: gridData3,
    className: "w-96",
  },
};

export const WithTitle: Story = {
  args: {
    columns: 2,
    data: gridData4,
    className: "w-96",
  },
};

export const WithLastUpdatedTime: Story = {
  args: {
    columns: 2,
    data: gridData4,
    className: "w-96",
    lastUpdatedTime: "11:00 Am",
  },
};
