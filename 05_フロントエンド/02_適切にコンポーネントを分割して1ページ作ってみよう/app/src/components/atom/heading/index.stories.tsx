import { ComponentMeta, ComponentStory } from "@storybook/react";
import Heading from "components/atom/heading";

export default {
  title: "Atom/Heading",
  componet: Heading,
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Post",
};
