import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import CustomInputNumber from "../components/atoms/CustomInputNumber";

const meta = {
  title: "Components/InputNumber",
  component: CustomInputNumber,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomInputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * This component only accepts numbers as input.
 *
 * Minimum and Maximum limit can be set as per business use-case.
 */
export const InputNumber: Story = {
  args: {
    containerclassname: "w-38w md:w-24w",
    min: 30,
    inputClassName: "w-60w sm:w-38w md:w-24w !bg-slate-800",
    onChange: () => {},
    placeholder: "Refresh duration starts from 30",
    className:
      "border rounded-lg border-solid border-slate-900 bg-slate-900 border-1 h-10	",
  },
};

/**
 * Default value being set need not necessarily fall within the defined range.
 */

export const InputNumberWithDefaultValue: Story = {
  args: {
    containerclassname: "w-38w md:w-24w",
    value: 90,
    min: 30,
    inputClassName: "w-60w sm:w-38w md:w-24w !bg-slate-800",
    onChange: () => {},
    placeholder: "Refresh duration starts from 30",
    className:
      "border rounded-lg border-solid border-slate-900 bg-slate-900 border-1 h-10	",
  },
};

/**
 * Placeholder is an optional field
 */
export const InputNumberWithoutPlaceHolder: Story = {
  args: {
    containerclassname: "w-38w md:w-24w",
    min: 30,
    inputClassName: "w-60w sm:w-38w md:w-24w !bg-slate-800",
    onChange: () => {},
    className:
      "border rounded-lg border-solid border-slate-900 bg-slate-900 border-1 h-10	",
  },
};

export const InputNumberDisabled: Story = {
  args: {
    containerclassname: "w-38w md:w-24w",
    min: 30,
    inputClassName: "w-60w sm:w-38w md:w-24w !bg-slate-800",
    disabled: true,
    onChange: () => {},
    className:
      "border rounded-lg border-solid border-slate-900 bg-slate-900 border-1 h-10	",
  },
};

/**
 * On using upward arrow, the value increments by custom step (in this ex: 15)
 */
export const InputNumberWithStep: Story = {
  args: {
    containerclassname: "w-38w md:w-24w",
    min: 30,
    inputClassName: "w-60w sm:w-38w md:w-24w !bg-slate-800",
    step: 15,
    onChange: () => {},
    className:
      "border rounded-lg border-solid border-slate-900 bg-slate-900 border-1 h-10	",
  },
};

/**
 * The component can be made read only.
 */
export const ReadOnlyInputNumber: Story = {
  args: {
    containerclassname: "w-38w md:w-24w",
    value: 47,
    inputClassName: "w-60w sm:w-38w md:w-24w !bg-slate-800",
    readOnly: true,
    onChange: () => {},
    className:
      "border rounded-lg border-solid border-slate-900 bg-slate-900 border-1 h-10	",
  },
};

/**
 * The component can be made to have auto focus.
 */

export const InputNumberWithAutoFocus: Story = {
  args: {
    containerclassname: "w-38w md:w-24w",
    value: 47,
    inputClassName: "w-60w sm:w-38w md:w-24w !bg-slate-800",
    autoFocus: true,
    onChange: () => {},
    className:
      "border rounded-lg border-solid border-slate-900 bg-slate-900 border-1 h-10	",
  },
};

/**
 * Tool tip appears on hover.
 */

export const InputNumberWithToolTip: Story = {
  args: {
    containerclassname: "w-38w md:w-24w",
    value: 4,
    inputClassName: "w-60w sm:w-38w md:w-24w !bg-slate-800",
    onChange: () => {},
    tooltip: "Your Custom tool tip content",
    className:
      "border rounded-lg border-solid border-slate-900 bg-slate-900 border-1 h-10	",
  },
};
