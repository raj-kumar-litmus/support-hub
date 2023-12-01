import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import CustomDropdown from "../components/DropDown";

const meta = {
  title: "Components/DropDown",
  component: CustomDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropDown: Story = {
  args: {
    onChange: () => {},
    options: [
      { name: "All", code: "All" },
      { name: "Mobile", code: "Mobile" },
    ],
    value: { name: "All", code: "All" },
    optionLabel: "name",
    placeholder: "Select a Channel",
  },
};
