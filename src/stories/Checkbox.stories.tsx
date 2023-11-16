import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import CustomCheckbox from "../components/common/CustomCheckBox";

const meta = {
  title: "Components/CheckBox",
  component: CustomCheckbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckBox: Story = {
  args: {},
};

/**
 * Checkbox can be disabled
 */

export const DisabledCheckBox: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Tool tip appears on hover.
 */
export const CheckBoxWithToolTip: Story = {
  args: {
    tooltip: "Tool tip content",
  },
};