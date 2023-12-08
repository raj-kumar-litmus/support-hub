import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchField from "../components/common/searchfield";

const meta = {
  title: "Stories/search-mobile",
  component: SearchField,
  decorators: [
    () => (
      <Router>
        <SearchField />
      </Router>
    ),
  ],
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    searchValue: "",
  },
};

export const OnChange: Story = {
  args: {
    searchValue: "#60577546279",
  },
};
