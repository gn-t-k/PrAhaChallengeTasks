import { ComponentMeta, ComponentStory } from "@storybook/react";
import CategoryList from "components/organism/category-list";

export default {
  title: "Organism/CategoryList",
  componet: CategoryList,
  argTypes: {
    text: {
      name: "text",
      type: {
        name: "string",
        required: true,
      },
      control: {
        type: "text",
      },
    },
  },
} as ComponentMeta<typeof CategoryList>;

const Template: ComponentStory<typeof CategoryList> = (args) => (
  <CategoryList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  categoryList: [
    {
      text: "AWS",
      href: "#",
    },
    {
      text: "Laravel",
      href: "#",
    },
  ],
};
