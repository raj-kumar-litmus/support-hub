import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import CustomButton from "../components/atoms/Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Button",
  component: CustomButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof CustomButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SuccessButton: Story = {
  args: {
    severity: "success",
    label: "Button",
  },
};

export const RoundedSuccessButton: Story = {
  args: {
    isRounded: true,
    severity: "success",
    label: "Button",
  },
};

export const AlertPopUpOnClick: Story = {
  args: {
    onClick: () => alert("You clicked me !!"),
    severity: "success",
    label: "Button",
  },
};

export const SecondaryButton: Story = {
  args: {
    severity: "secondary",
    label: "Button",
  },
};

export const InfoButton: Story = {
  args: {
    severity: "info",
    label: "Button",
  },
};

export const DisabledInfoButton: Story = {
  args: {
    label: "Button",
    isDisabled: true,
    severity: "info",
  },
};

export const WarningButton: Story = {
  args: {
    severity: "warning",
    label: "Button",
  },
};

export const DangerButton: Story = {
  args: {
    severity: "danger",
    label: "Button",
  },
};

export const HelpButton: Story = {
  args: {
    severity: "help",
    label: "Button",
  },
};

export const ButtonWithNoSeverity: Story = {
  args: {
    label: "Button",
  },
};

// storiesOf('FooBar', module).add('I get state', () => {
//   const [count, set] = useState('clicks', 0);

//   return (
//     <div>
//       <button onClick={() => set(count + 1)}>Click Me</button>
//       <div>{`I was clicked ${count} time(s)`}</div>
//     </div>
//   );
// });
