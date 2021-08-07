import { ComponentMeta, ComponentStory } from "@storybook/react";
import Category from "components/atom/category";

export default {
  title: "Atom/Category",
  componet: Category,
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
} as ComponentMeta<typeof Category>;

const Template: ComponentStory<typeof Category> = (args) => (
  <Category {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "AWS",
  href: "#",
};
