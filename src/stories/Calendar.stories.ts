import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import CustomCalendar from "../components/Calendar";

const meta = {
  title: "Components/Calendar",
  component: CustomCalendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CalendarWithMmDdYy: Story = {
  args: {
    onChange: () => {},
    dateFormat: "mm/dd/yy",
  },
};

export const CalendarWithDdMmYy: Story = {
  args: {
    onChange: () => {},
    dateFormat: "dd/mm/yy",
  },
};

export const CalendarWithoutIcon: Story = {
  args: {
    onChange: () => {},
    showIcon: false,
    dateFormat: "mm/dd/yy",
  },
};

export const CalendarWithPlaceHolder: Story = {
  args: {
    onChange: () => {},
    dateFormat: "dd/mm/yy",
    placeholder: "Choose a date",
  },
};

export const CalendarWithDefaultValue: Story = {
  args: {
    dateFormat: "dd/mm/yy",
    value: new Date("04/04/1992"),
    placeholder: "Choose a date",
  },
};

export const CalendarWithIconInRight: Story = {
  args: {
    dateFormat: "dd/mm/yy",
    iconPos: "right",
  },
};
