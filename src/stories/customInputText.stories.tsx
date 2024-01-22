import type { Meta, StoryObj } from "@storybook/react";
import CustomInputText from "../components/atoms/InputText";

const meta = {
  title: "Components/CustomInputText",
  component: CustomInputText,
  tags: ["autodocs"],
} satisfies Meta<typeof CustomInputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: "text",
    placeholder: "Input text",
    value: "",
    className:
      "w-full focus:outline-none placeholder:text-stone-500 bg-transparent placeholder:font-helvetica placeholder:font-medium",
  },
};

export const OnChange: Story = {
  args: {
    type: "text",
    placeholder: "Input text",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    className: "w-full focus:outline-none",
  },
};

export const SmallSizeInputText: Story = {
  args: {
    type: "text",
    placeholder: "small",
    value: "",
    className: " p-inputtext-sm w-full focus:outline-none",
  },
};

export const LargeSizeInputText: Story = {
  args: {
    type: "text",
    placeholder: "large",
    value: "",
    className: "p-inputtext-lg w-full focus:outline-none",
  },
};

export const InvalidInput: Story = {
  args: {
    type: "text",
    placeholder: "invalid",
    value: "",
    className: "p-invalid w-full focus:outline-none",
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "disabled",
    value: "",
    disabled: true,
    className: "w-full focus:outline-none",
  },
};
