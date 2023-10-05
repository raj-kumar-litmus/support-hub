import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import FilteredCard from "../components/FilteredCard";
import SmallCalendar from "../assets/calendar_small.svg";
import "../index.css";

const meta = {
  title: "Components/FiteredCard",
  component: FilteredCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FilteredCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    content: "lorem ipsum",
  },
};

export const CardWithIcon: Story = {
  args: {
    content: "lorem ipsum",
    leftIcon: SmallCalendar,
  },
};

export const CardWithOnClickHandler: Story = {
  args: {
    content: "lorem ipsum",
    leftIcon: SmallCalendar,
    onClickHandler: () => alert("You clicked the card"),
  },
};
