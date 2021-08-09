import { ComponentMeta, ComponentStory } from "@storybook/react";
import AuthorPosts from "components/atom/author-posts";

export default {
  title: "Atom/AuthorPosts",
  componet: AuthorPosts,
} as ComponentMeta<typeof AuthorPosts>;

const Template: ComponentStory<typeof AuthorPosts> = (args) => (
  <AuthorPosts {...args} />
);

export const Default = Template.bind({});
Default.args = {
  amount: 23,
};
