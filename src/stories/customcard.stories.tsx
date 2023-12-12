import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "primereact/button";
import CustomCard from "../components/common/customcard";

const meta = {
  title: "Components/Card",
  component: CustomCard,
  tags: ["autodocs"],
} satisfies Meta<typeof CustomCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Title",
    children: (
      <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </p>
    ),
  },
};

export const CardWithButton = {
  args: {
    title: "Title",
    children: (
      <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </p>
    ),
    footer: <Button label="Save" icon="pi pi-check" />,
  },
};

export const CardWithSubtitleHeaderAndFooter: Story = {
  args: {
    title: "Title",
    subTitle: "Subtitle",
    footer: (
      <div className="flex flex-wrap justify-content-end gap-2">
        <Button label="Save" icon="pi pi-check" />
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-outlined p-button-secondary"
        />
      </div>
    ),
    header: (
      <img
        alt="Card"
        src="https://primefaces.org/cdn/primereact/images/usercard.png"
      />
    ),
    className: "w-[25rem]",
    children: (
      <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </p>
    ),
  },
};
