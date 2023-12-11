import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import CustomButton from "../components/Button";
import CustomSideBar from "../components/CustomSideBar";

const meta = {
  title: "Stories/custom-sidebar",
  component: CustomSideBar,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["right", "left"],
      default: "right",
    },
  },
} satisfies Meta<typeof CustomSideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    visible: false,
    position: "right",
    title: "Title",
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    ),
  },
};

export const ShowSideBarOnBtnClick: Story = () => {
  const [visible, setVisible] = useState(false);
  const args = {
    position: "right",
    title: "Title",
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    ),
  };
  const showSideBar = () => {
    setVisible(!visible);
  };
  return (
    <>
      <CustomButton onClick={showSideBar}>Show Sidebar</CustomButton>
      <CustomSideBar {...args} visible={visible} setVisible={setVisible} />
    </>
  );
};

export const SideBarOnLeftAndRightPositions: Story = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("right");
  const args = {
    title: "Title",
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    ),
  };
  const loadSideBar = (position) => {
    setPosition(position);
    setVisible(true);
  };
  return (
    <>
      <div className="flex gap-2">
        <CustomButton onClick={() => loadSideBar("right")}>
          Right Sidebar
        </CustomButton>
        <CustomButton onClick={() => loadSideBar("left")}>
          Left Sidebar
        </CustomButton>
      </div>
      <CustomSideBar
        {...args}
        position={position}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export const SideBarWithLightAndDarkBackground: Story = () => {
  const [visible, setVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const args = {
    position: "right",
    title: "Title",
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    ),
  };
  const showSideBar = (isDark) => {
    setIsDarkTheme(isDark);
    setVisible(!visible);
  };
  return (
    <>
      <div className="flex gap-2">
        <CustomButton onClick={() => showSideBar(false)}>
          Light Sidebar
        </CustomButton>
        <CustomButton onClick={() => showSideBar(true)}>
          Dark Sidebar
        </CustomButton>
      </div>
      <CustomSideBar
        {...args}
        visible={visible}
        setVisible={setVisible}
        themeClasses={isDarkTheme ? "" : "!bg-white-500 !text-black-500"}
      />
    </>
  );
};
