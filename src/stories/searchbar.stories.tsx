import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchBar from "../components/common/SearchBar";

const meta = {
  title: "Stories/search-web",
  component: SearchBar,
  decorators: [
    () => (
      <Router>
        <SearchBar />
      </Router>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    searchValue: "",
    showSearchButton: true,
    openSearchField: false,
  },
};

export const OnChange: Story = {
  args: {
    searchValue: "#60577546279",
    showSearchButton: true,
    openSearchField: false,
  },
};
