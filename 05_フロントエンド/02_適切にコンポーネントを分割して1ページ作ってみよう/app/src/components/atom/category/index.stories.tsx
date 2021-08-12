import { ComponentMeta, ComponentStory } from "@storybook/react";
import Category from "components/atom/category";

export default {
  title: "Atom/Category",
  componet: Category,
} as ComponentMeta<typeof Category>;

const Template: ComponentStory<typeof Category> = (args) => (
  <Category {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "AWS",
  href: "#",
};
