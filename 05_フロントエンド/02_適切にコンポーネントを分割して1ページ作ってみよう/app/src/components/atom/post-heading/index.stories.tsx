import { ComponentMeta, ComponentStory } from "@storybook/react";
import PostHeading from "components/atom/post-heading";

export default {
  title: "Atom/PostHeading",
  componet: PostHeading,
} as ComponentMeta<typeof PostHeading>;

const Template: ComponentStory<typeof PostHeading> = (args) => (
  <PostHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Build Your New Idea with Laravel Freamwork.",
  href: "#",
};
