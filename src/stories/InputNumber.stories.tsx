import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import CustomInputNumber from "../components/common/CustomInputNumber";

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
    containerclassname: "w-[38vw] md:w-[24vw]",
    min: 30,
    inputClassName: "w-[60vw] sm:w-[38vw] md:w-[24vw] !bg-slate-800",
    onChange: () => {},
    placeholder: "Refresh duration starts from 30",
    className:
      "border rounded-[8px] border-solid border-slate-900 bg-slate-900 border-1 h-[40px]",
  },
};

/**
 * Default value being set need not necessarily fall within the defined range.
 */

export const InputNumberWithDefaultValue: Story = {
  args: {
    containerclassname: "w-[38vw] md:w-[24vw]",
    value: 90,
    min: 30,
    inputClassName: "w-[60vw] sm:w-[38vw] md:w-[24vw] !bg-slate-800",
    onChange: () => {},
    placeholder: "Refresh duration starts from 30",
    className:
      "border rounded-[8px] border-solid border-slate-900 bg-slate-900 border-1 h-[40px]",
  },
};

/**
 * Placeholder is an optional field
 */
export const InputNumberWithoutPlaceHolder: Story = {
  args: {
    containerclassname: "w-[38vw] md:w-[24vw]",
    min: 30,
    inputClassName: "w-[60vw] sm:w-[38vw] md:w-[24vw] !bg-slate-800",
    onChange: () => {},
    className:
      "border rounded-[8px] border-solid border-slate-900 bg-slate-900 border-1 h-[40px]",
  },
};

export const InputNumberDisabled: Story = {
  args: {
    containerclassname: "w-[38vw] md:w-[24vw]",
    min: 30,
    inputClassName: "w-[60vw] sm:w-[38vw] md:w-[24vw] !bg-slate-800",
    disabled: true,
    onChange: () => {},
    className:
      "border rounded-[8px] border-solid border-slate-900 bg-slate-900 border-1 h-[40px]",
  },
};

/**
 * On using upward arrow, the value increments by custom step (in this ex: 15)
 */
export const InputNumberWithStep: Story = {
  args: {
    containerclassname: "w-[38vw] md:w-[24vw]",
    min: 30,
    inputClassName: "w-[60vw] sm:w-[38vw] md:w-[24vw] !bg-slate-800",
    step: 15,
    onChange: () => {},
    className:
      "border rounded-[8px] border-solid border-slate-900 bg-slate-900 border-1 h-[40px]",
  },
};

/**
 * The component can be made read only.
 */
export const ReadOnlyInputNumber: Story = {
  args: {
    containerclassname: "w-[38vw] md:w-[24vw]",
    value: 47,
    inputClassName: "w-[60vw] sm:w-[38vw] md:w-[24vw] !bg-slate-800",
    readOnly: true,
    onChange: () => {},
    className:
      "border rounded-[8px] border-solid border-slate-900 bg-slate-900 border-1 h-[40px]",
  },
};

/**
 * The component can be made to have auto focus.
 */

export const InputNumberWithAutoFocus: Story = {
  args: {
    containerclassname: "w-[38vw] md:w-[24vw]",
    value: 47,
    inputClassName: "w-[60vw] sm:w-[38vw] md:w-[24vw] !bg-slate-800",
    autoFocus: true,
    onChange: () => {},
    className:
      "border rounded-[8px] border-solid border-slate-900 bg-slate-900 border-1 h-[40px]",
  },
};

/**
 * Tool tip appears on hover.
 */

export const InputNumberWithToolTip: Story = {
  args: {
    containerclassname: "w-[38vw] md:w-[24vw]",
    value: 4,
    inputClassName: "w-[60vw] sm:w-[38vw] md:w-[24vw] !bg-slate-800",
    onChange: () => {},
    tooltip: "Your Custom tool tip content",
    className:
      "border rounded-[8px] border-solid border-slate-900 bg-slate-900 border-1 h-[40px]",
  },
};
