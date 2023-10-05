import SearchBar from "../components/common/searchbar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Stories/search-web",
  component: SearchBar,
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
