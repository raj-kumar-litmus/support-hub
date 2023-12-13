import type { Meta } from "@storybook/react";
import WebServerCard from "../components/ServerCard";

const meta: Meta = {
  title: "Components/ServerCard&Overlay",
  component: WebServerCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="p-5 h-screen bg-black-500">
        <Story />
      </div>
    ),
  ],
};

export default meta;

const cardData = {
  title: "atg_webcomserver",
  perSecond: "121/sec",
  perTotal: "51/122",
};


export const Default = {};

export const WithTitle = {
  args: {
    title: cardData.title,
  },
};
export const WithSubHeader = {
  args: {
    title: cardData.title,
    perSecond: cardData.perSecond,
  },
};
export const WithSideText = {
  args: {
    title: cardData.title,
    perSecond: cardData.perSecond,
    perTotal: cardData.perTotal,
  },
};
export const MultipleServerCards: Story = () => {
  const args = {
    title: "atg_webcomserver",
    perSecond: cardData.perSecond,
    perTotal: cardData.perTotal,

    box1Header: "Active",
    box1Content: "51",
    box1Class: "border-[#0EA67C] text-[#0EA67C]",
    box2Header: "Idle",
    box2Class: "border-[#F86E6E] text-[#F86E6E]",
    box2Content: "122",
    header: cardData.title,
    subHeader: cardData.perSecond,
    buttonContent: "Details",
  };
  return (
    <>
      <div className="border-2 border-[#424245] w-[46%] h-72 overflow-y-auto">
        <div className="grid grid-cols-2 ml-3 gap-x-0">
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
        </div>
      </div>
    </>
  );
};
export const Overlay = {
  args: {
    title: "Click",
    perSecond: cardData.perSecond,
    perTotal: cardData.perTotal,
    showToolTip: true,
    header: "Default Overlay",
  },
};

export const OverlayWithHeader = {
  args: {
    title: "Click",
    perSecond: cardData.perSecond,
    perTotal: cardData.perTotal,
    showToolTip: true,

    header: cardData.title,
  },
};
export const OverlayWithHeaderAndSubheader = {
  args: {
    title: "Click",
    perSecond: cardData.perSecond,
    perTotal: cardData.perTotal,
    showToolTip: true,

    header: cardData.title,
    subHeader: cardData.perSecond,
  },
};
export const HeaderSubheaderAndSingleBox = {
  args: {
    title: "Click",
    perSecond: cardData.perSecond,
    perTotal: cardData.perTotal,
    showToolTip: true,
    box1Header: "Active",
    box1Content: "51",
    header: cardData.title,
    subHeader: cardData.perSecond,
  },
};
export const HeaderSubheaderAndBoxes = {
  args: {
    title: "Click",
    perSecond: cardData.perSecond,
    perTotal: cardData.perTotal,
    showToolTip: true,
    box1Header: "Active",
    box1Content: "51",

    box2Header: "Idle",

    box2Content: "122",
    header: cardData.title,
    subHeader: cardData.perSecond,
  },
};
export const ColoredBoxes = {
  args: {
    title: "Click",

    perSecond: cardData.perSecond,
    perTotal: cardData.perTotal,
    showToolTip: true,
    box1Header: "Active",
    box1Content: "51",
    box1Class: "border-[#0EA67C] text-[#0EA67C]",
    box2Header: "Idle",
    box2Class: "border-[#F86E6E] text-[#F86E6E]",
    box2Content: "122",
    header: cardData.title,
    subHeader: cardData.perSecond,
  },
};
export const OverlayWithHeaderSubheaderAndButton = {
  args: {
    title: "Click",
    perSecond: cardData.perSecond,
    perTotal: cardData.perTotal,
    showToolTip: true,
    bgColor: true,
    header: cardData.title,
    subHeader: cardData.perSecond,
    buttonContent: "Details",
  },
};

export const OverlaywithALL = {
  args: {
    title: "Click",
    perSecond: cardData.perSecond,
    perTotal: cardData.perTotal,
    showToolTip: true,
    box1Header: "Active",
    box1Content: "51",
    box1Class: "border-[#0EA67C] text-[#0EA67C]",
    box2Header: "Idle",
    box2Class: "border-[#F86E6E] text-[#F86E6E]",
    box2Content: "122",
    header: cardData.title,
    subHeader: cardData.perSecond,
    buttonContent: "Details",
  },
};
export const MultipleServerCardsWithOverlay: Story = () => {
  const args = {
    title: "atg_webcomserver",
    perSecond: cardData.perSecond,
    perTotal: cardData.perTotal,
    showToolTip:true,
    box1Header: "Active",
    box1Content: "51",
    box1Class: "border-[#0EA67C] text-[#0EA67C]",
    box2Header: "Idle",
    box2Class: "border-[#F86E6E] text-[#F86E6E]",
    box2Content: "122",
    header: cardData.title,
    subHeader: cardData.perSecond,
    
  };
  return (
    <>
      <div className="relative border-2 border-[#424245] top-[25%] left-[25%] w-[46%] h-[75%] overflow-y-auto">
        <div className="grid grid-cols-2 ml-3 gap-x-0">
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
          <WebServerCard {...args}></WebServerCard>
        </div>
      </div>
    </>
  );
};