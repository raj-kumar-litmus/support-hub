import type { Meta } from "@storybook/react";
import Card from "./card";

const meta = {
  title: "Example/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Card>;

export default meta;

const cardData = {
  "DC Name": "UDC",
  Country: "US",
  "Shipment Node": "0801",
  "Workable Orders": 3562,
};

export const Default = {
  args: {},
};

export const CardWithButton = {
  args: {
    button: true,
  },
};

export const DCOpenOrdersCard = {
  args: {
    cardData: cardData,
  },
};

export const Small = {
  args: {
    cardData: cardData,
    width: "small",
  },
};

export const Large = {
  args: {
    cardData: cardData,
    width: "large",
  },
};
