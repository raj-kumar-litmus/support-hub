import type { Meta, StoryObj } from "@storybook/react";
import CustomInputText from "../components/common/custominputtext";

const meta = {
  title: "Stories/custominputtext",
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

export const onChange: Story = {
  args: {
    type: "text",
    placeholder: "Input text",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    className: "w-full focus:outline-none",
  },
};

export const smallSizeInputText: Story = {
  args: {
    type: "text",
    placeholder: "small",
    value: "",
    className: " p-inputtext-sm w-full focus:outline-none",
  },
};

export const largeSizeInputText: Story = {
  args: {
    type: "text",
    placeholder: "large",
    value: "",
    className: "p-inputtext-lg w-full focus:outline-none",
  },
};

export const invalidInput: Story = {
  args: {
    type: "text",
    placeholder: "invalid",
    value: "",
    className: "p-invalid w-full focus:outline-none",
  },
};

export const disabled: Story = {
  args: {
    type: "text",
    placeholder: "disabled",
    value: "",
    disabled: true,
    className: "w-full focus:outline-none",
  },
};
