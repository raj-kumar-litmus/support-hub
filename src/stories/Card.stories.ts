import type { Meta } from "@storybook/react";
import Card from "../components/Common/Card/Card";

const meta = {
  title: "Example/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Card>;

export default meta;

export const Default = {
  args: {
    cardData: {
      "DC Name": "UDC",
      Country: "US",
      "Shipment Node": "0801",
      "Workable Orders": 3562,
    },
  },
};
