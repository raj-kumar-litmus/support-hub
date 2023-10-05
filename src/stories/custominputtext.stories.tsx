import type { Meta, StoryObj } from "@storybook/react";
import CustomInputText from "../components/common/custominputtext";

const meta = {
  title: "Stories/custominputtext",
  component: CustomInputText,
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
