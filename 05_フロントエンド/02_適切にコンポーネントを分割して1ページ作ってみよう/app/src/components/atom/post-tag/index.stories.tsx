import { ComponentMeta, ComponentStory } from "@storybook/react";
import PostTag from "components/atom/post-tag";

export default {
  title: "Atom/PostTag",
  componet: PostTag,
} as ComponentMeta<typeof PostTag>;

const Template: ComponentStory<typeof PostTag> = (args) => (
  <PostTag {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Laravel",
  href: "#",
};
