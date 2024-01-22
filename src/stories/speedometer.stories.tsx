import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Speedometer from "../components/atoms/Speedometer";

const meta: any = {
  title: "Components/Speedometer",
  component: Speedometer,
  decorators: [
    (Speedometer) => (
      <Router>
        <Speedometer />
      </Router>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Speedometer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoConfig: Story = {
  args: {},
};

export const DefaultValues: Story = {
  args: {
    maxValue: 500,
    value: 473,
    needleColor: "red",
    startColor: "green",
    segments: 10,
    endColor: "blue",
    textColor: "pink",
  },
};

export const CustomSegmentLabels: Story = {
  args: {
    width: 600,
    needleHeightRatio: 0.7,
    value: 777,
    currentValueText: "Happiness Level",
    customSegmentLabels: [
      {
        text: "Very Bad",
        position: "INSIDE",
        color: "#555",
      },
      {
        text: "Bad",
        position: "INSIDE",
        color: "#555",
      },
      {
        text: "Ok",
        position: "INSIDE",
        color: "#555",
        fontSize: "19px",
      },
      {
        text: "Good",
        position: "INSIDE",
        color: "#555",
      },
      {
        text: "Very Good",
        position: "INSIDE",
        color: "#555",
      },
    ],
    ringWidth: 47,
    needleTransitionDuration: 3333,
    needleTransition: "easeElastic",
    needleColor: "#90f2ff",
    textColor: "#d8dee9",
  },
};

export const CustomSegmentLabelsOutside: Story = {
  args: {
    width: 500,
    needleHeightRatio: 0.9,
    value: 777,
    currentValueText: "Happiness Level",
    customSegmentLabels: [
      {
        text: "Very Bad",
        position: "OUTSIDE",
        color: "#555",
      },
      {
        text: "Bad",
        position: "OUTSIDE",
        color: "#555",
      },
      {
        text: "Ok",
        position: "OUTSIDE",
        color: "#555",
        fontSize: "19px",
      },
      {
        text: "Good",
        position: "OUTSIDE",
        color: "#555",
      },
      {
        text: "Very Good",
        position: "OUTSIDE",
        color: "#555",
      },
    ],
    ringWidth: 37,
    needleTransitionDuration: 4000,
    needleTransition: "easeElastic",
    needleColor: "red",
    textColor: "#d8dee9",
    paddingVertical: 17,
  },
};

export const CustomSegmentLabelColors: Story = {
  args: {
    segments: 3,
    value: 470,
    segmentColors: ["#FF9933", "#ECEFF4", "#138808"],
    needleColor: "#000080",
    textColor: "red",
  },
};

export const CustomSegmentStops: Story = {
  args: {
    needleHeightRatio: 0.7,
    maxSegmentLabels: 5,
    segments: 3,
    customSegmentStops: [0, 500, 750, 900, 1000],
    segmentColors: ["firebrick", "tomato", "gold", "limegreen"],
    value: 333,
    textColor: "red",
  },
};

export const FluidWidth: Story = {
  args: {
    containerClassName: "bg-gray-700 w-[60vw] h-[70vh] m-auto",
    fluidWidth: true,
    minValue: 100,
    maxValue: 500,
    value: 473,
    needleColor: "steelblue",
    textColor: "red",
  },
};

export const NeedleTransitionDuration: Story = {
  args: {
    value: 333,
    needleColor: "steelblue",
    needleTransitionDuration: 4000,
    needleTransition: "easeElastic",
    textColor: "red",
  },
};

export const CustomSegmentValueFormatter: Story = {
  args: {
    value: 533,
    needleColor: "steelblue",
    segmentValueFormatter: (value) => {
      if (Number(value) < 200) {
        return `${value} 😒`;
      }
      if (Number(value) < 400) {
        return `${value} 😐`;
      }
      if (Number(value) < 600) {
        return `${value} 😌`;
      }
      if (Number(value) < 800) {
        return `${value} 😊`;
      }
      if (Number(value) < 900) {
        return `${value} 😉`;
      }

      return `${value} 😇`;
    },
    textColor: "pink",
    paddingHorizontal: 34,
    paddingVertical: 34,
  },
};

export const CustomCurrentValueText: Story = {
  args: {
    value: 333,
    needleColor: "steelblue",
    needleTransitionDuration: 4000,
    needleTransition: "easeElastic",
    currentValueText: "Current Value: ${value}",
    textColor: "red",
  },
};

export const ConfigureNeedleLengthAndFontSizes: Story = {
  args: {
    value: 333,
    needleHeightRatio: 0.5,
    labelFontSize: "15px",
    valueTextFontSize: "23px",
    textColor: "red",
  },
};

export const GradientEffectWithLargeNumberOfSegments: Story = {
  args: {
    maxSegmentLabels: 5,
    segments: 5555,
    value: 333,
    needleHeightRatio: 0.7,
    textColor: "red",
  },
};

export const NoSegmentLabels: Story = {
  args: {
    maxSegmentLabels: 0,
    segments: 5,
    value: 690,
    textColor: "red",
  },
};

export const CustomizeFontSizesAndSpacing: Story = {
  args: {
    value: 333,
    labelFontSize: "21px",
    valueTextFontSize: "40px",
    valueTextFontWeight: "500",
    paddingHorizontal: 17,
    paddingVertical: 17,
    currentValueText: "Value: ${value}",
    textColor: "red",
  },
};

export const TrafficSignalColors: Story = {
  args: {
    needleHeightRatio: 0.7,
    maxSegmentLabels: 0,
    segments: 3,
    customSegmentStops: [0, 30, 31, 70, 71, 100],
    maxValue: 100,
    segmentColors: ["green", "#29292A", "#ffff00", "#29292A", "red"],
    value: 27,
    needleColor: "#fff",
    valueTextFontSize: "0px",
    containerClassName: "bg-[#29292A] h-[30vh]",
  },
};

export const GreenSpeedometer: Story = {
  args: {
    needleHeightRatio: 0.7,
    maxSegmentLabels: 0,
    segments: 3,
    customSegmentStops: [0, 30, 31, 70, 71, 100],
    maxValue: 100,
    segmentColors: ["#336C6C", "#29292A", "#37A6A7", "#29292A", "#3ED9DB"],
    needleColor: "#fff",
    value: 27,
    valueTextFontSize: "0px",
    containerClassName: "bg-[#29292A] h-[30vh]",
  },
};

export const PurpleSpeedometer: Story = {
  args: {
    needleHeightRatio: 0.7,
    maxSegmentLabels: 0,
    segments: 3,
    customSegmentStops: [0, 30, 31, 70, 71, 100],
    maxValue: 100,
    segmentColors: ["#55609C", "#29292A", "#697AD1", "#29292A", "#7487EB"],
    needleColor: "#fff",
    value: 27,
    valueTextFontSize: "0px",
    containerClassName: "bg-[#29292A] h-[30vh]",
  },
};

export const GreenBlackSpeedometer: Story = {
  args: {
    maxSegmentLabels: 0,
    width: 400,
    height: 200,
    ringWidth: 17,
    customSegmentStops: [0, 30, 100],
    maxValue: 100,
    segmentColors: ["#0EA67C", "#21262D"],
    needleColor: "transparent",
    valueTextFontSize: "0px",
    containerClassName: "bg-[#14181E] h-[60vh]",
    value: 27,
    currentValueText: "Active Value: ${value}",
    textColor: "red",
  },
};

export const GradientSpeedometer: Story = {
  args: {
    value: 50,
    segments: 6,
    customSegmentStops: [0, 32, 34, 66, 68, 100],
    segmentColors: [
      "url(#gradient-segment-1)",
      "transparent",
      "url(#gradient-segment-2)",
      "transparent",
      "url(#gradient-segment-3)",
    ],
    ringWidth: 80,
    width: 500,
    height: 1000,
    maxSegmentLabels: 0,
    currentValueText: "",
    maxValue: 100,
    needleColor: "white",
    textColor: "transparent",
    needleHeightRatio: 0.8,
    containerClassName: "bg-[#29292A] h-[30vh]",
  },
};
