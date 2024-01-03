import type { Meta, StoryObj } from "@storybook/react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import CustomModal from "../components/atoms/CustomDialog";
import "../index.css";

const meta = {
  title: "Components/Modal",
  component: CustomModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const headerContent = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis <b>nostrud exercitation ullamco laboris</b> nisi ut aliquip
      ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </div>
  );
};

export const Modal: Story = {
  args: {
    onHide: () => {},
    header: "Modal header",
    visible: true,
    position: "top",
    children: headerContent(),
  },
};

export const ModalWithCustomWidth: Story = {
  args: {
    onHide: () => {},
    className: "w-[400px]",
    header: "Modal header",
    visible: true,
    position: "top",
    children: headerContent(),
  },
};

export const ModalOnHideTriggersAlert: Story = {
  args: {
    onHide: () => {
      alert("You hid the modal !!");
    },
    header: "Modal header",
    visible: true,
    position: "top",
    children: headerContent(),
  },
};

export const HiddenModal: Story = {
  args: {
    onHide: () => {},
    header: "Modal header",
    visible: false,
    position: "top",
    children: headerContent(),
  },
};

export const ModalPositionedAtBottom: Story = {
  args: {
    onHide: () => {},
    header: "Modal header",
    visible: true,
    position: "bottom",
    children: headerContent(),
  },
};

export const ModalPositionedAtCenter: Story = {
  args: {
    onHide: () => {},
    header: "Modal header",
    visible: true,
    position: "center",
    children: headerContent(),
  },
};
